import { Observable, Subscriber, combineLatest, map } from "rxjs";
import { ComponentModel } from "./component-model";
import { ComponentEvents } from "../events/component-events";

/**
 * Abstract class representing a Component
 */
export abstract class Component<TModel extends ComponentModel> {
    private ElementsValidators = new Map<HTMLElement, (element: HTMLElement) => boolean>();
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
        ComponentEvents.ReinitRequested.Subscribe(_ => {
            this.DoInit();
        });
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
        ComponentEvents.ReinitRequested.Publish(1);
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
      * Remove all registered element validators
      */
    private ClearValidationCallbacks() {
        this.ElementsValidators.clear();
    }

    /**
     * Generate a random string to insure event namespace unicity
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