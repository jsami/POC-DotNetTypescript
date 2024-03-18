import { Observable, Subscriber, combineLatest, map } from "rxjs";

export interface ComponentModel { }

/**
 * Abstract class representing a Component
 */
export abstract class Component<TModel extends ComponentModel> {
    private ElementsValidators = new Map<HTMLElement, (element: HTMLElement) => boolean>();
    private Children: Component<TModel>[] = [];
    private Parent: Component<TModel> | null = null;
    private readonly EventNamespace: string;
    protected readonly ValidationEvent = 'input-validation-event';
    protected Model: TModel;
    
    constructor() {
        this.EventNamespace = this.GenerateEventNameSpace();
    }

    /**
    * Initialize component states
    * @param model
    * @returns
    */
    Init(model: TModel) {
        this.Model = model;
        for (const child of this.Children) {
            child.Init(model);
        }
        this.DoInit();
    }

    /**
     * Component initialization pipeline
     */
    private DoInit() {
        this.DetachEvents();
        this.ClearValidationCallbacks();
        this.OnInit();
    }

    /**
     * Trigger component reinitialization using the same config used at initialization
     * Useful if the DOM with which the component was built has been mutated / reloaded
     */
    protected ReInit() {
        if (this.Parent !== null) {
            this.Parent.ReInit();
        } else {
            this.Init(this.Model);
        }
    }

    /**
     * Add child components
     * @param children
     */
    protected AddChildren(...children: Component<TModel>[]) {
        for (const child of children) {
            this.Children.push(child);
            child.Parent = this;
        }
    }

    /**
     * Add here any logics that need to be called on component initialization.
     */
    protected abstract OnInit(): void;


    /**
     * Remove all registered event handler scoped to the current component
     */
    private DetachEvents() {
        $(document).off(`.${this.EventNamespace}`);
    }

    /**
     * Appends a namespace to an event.
     * A namespace is unique per component
     * @param name
     * @returns
     */
    protected Event(name: string) {
        return `${name}.${this.EventNamespace}`;
    }

    /**
     * Attach validation logic to an element
     * @param elementOrSelector
     * @param isValid
     */
    protected Validate(elementOrSelector: HTMLElement | string, isValid: (input: HTMLElement) => boolean) {
        const eventListener = (event: JQuery.TriggeredEvent) => {
            let field = $(event.currentTarget);
            field.removeClass('has-success').removeClass('has-error');
            let status = isValid(event.currentTarget);
            if (status) {
                field.addClass('has-success');
            } else {
                field.addClass('has-error');
            }
        };
        
        if (typeof (elementOrSelector) === 'string') {
            $(elementOrSelector).each((_index, element) => {
                $(element).on(this.ValidationEvent, eventListener);
                this.ElementsValidators.set(element, isValid)
            })
        }
        else {
            $(elementOrSelector).on(this.ValidationEvent, eventListener);
            this.ElementsValidators.set(elementOrSelector, isValid)
        }
    }

    /**
     * Get an observable that produce validation status for an element
     * @param element
     * @returns 
     */
    protected  ObservableValidationOf(element: HTMLElement) : Observable<boolean> {
        return this.ObservableFromValidationEvent(element).pipe(
            map(ev => {
                let isValid = this.ElementsValidators.get(ev.currentTarget);
                if (isValid) {
                    return isValid(element);
                }
                return true;
            })
        )
    }

    /**
     * Create an observable from element validation event
     * @param element 
     * @returns 
     */
    private ObservableFromValidationEvent(element: HTMLElement) {
        return new Observable((subscriber: Subscriber<JQuery.TriggeredEvent>) => {
            const handler = (event: JQuery.TriggeredEvent) => subscriber.next(event);
            $(element).on(this.ValidationEvent, handler);
            return () => {
                $(element).off(this.ValidationEvent, handler);
            }
        });
    }

    protected AllValid(...validations: Observable<boolean>[]) : Observable<boolean> {
        return combineLatest(validations).pipe(
            map(validationResults => {
                let result = validationResults.reduce((acc, curVal) => acc = acc && curVal, true);
                return result;
            })
        );
    }

    /**
      * Remove all registered validation callbacks
      */
    private ClearValidationCallbacks() {
        this.ElementsValidators.clear();
    }

    /**
     * Generate a random string to insure namespace unicity
     * @returns
     */
    private GenerateEventNameSpace() : string {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 50; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}