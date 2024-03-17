export interface ComponentModel { }

/**
 * Abstract class representing a Component
 */
export abstract class Component<TModel extends ComponentModel> {
    private ValidationCallbacks = new Map<HTMLElement, ((status: boolean, element: HTMLElement) => void)[]>();
    private Children: Component<TModel>[] = [];
    private Parent: Component<TModel> = null;
    private readonly EventNamespace: string;
    protected readonly ValidationEvent = 'input-validation-event';
    protected Config: TModel;
    
    constructor() {
        this.EventNamespace = this.GenerateEventNameSpace();
    }

    /**
    * Initialize component states
    * @param config
    * @returns
    */
    Init(config?: TModel) {
        this.Config = config;
        for (const child of this.Children) {
            child.Init(config);
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
            this.Init(this.Config);
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
     * Add here any logics that need to be called at start of initialization.
     * @param _config
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
            field.parent().removeClass('has-success').removeClass('has-error');
            let status = isValid(event.currentTarget);
            if (status) {
                field.parent().addClass('has-success');
            } else {
                field.parent().addClass('has-error');
            }

            if (this.ValidationCallbacks.has(event.currentTarget)) {
                for (const callback of this.ValidationCallbacks.get(event.currentTarget)) {
                    callback(status, event.currentTarget);
                }
            }
        };

        if (typeof (elementOrSelector) === 'string') {
            $(elementOrSelector).each((_index, element) => {
                $(element).on(this.ValidationEvent, eventListener);
            })
        }
        else {
            $(elementOrSelector).on(this.ValidationEvent, eventListener);
        }
    }

    /**
     * Attach a callback to an element validation event
     * @param element
     * @param callback
     */
    protected AddValidationCallback(
        elementOrSelector: HTMLElement | string, callback: (status: boolean, element: HTMLElement) => void) {
        const addCallback = (element: HTMLElement) => {
            if (!this.ValidationCallbacks.has(element)) {
                this.ValidationCallbacks.set(element, []);
            }
            this.ValidationCallbacks.get(element).push(callback);
        }

        if (typeof (elementOrSelector) === 'string') {
            $(elementOrSelector).each((_index, element) => {
                addCallback(element);
            });
        } else {
            addCallback(elementOrSelector);
        }
    }

    /**
      * Remove all registered validation callbacks
      */
    private ClearValidationCallbacks() {
        this.ValidationCallbacks.clear();
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