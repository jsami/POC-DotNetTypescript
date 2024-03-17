import { Component, ComponentModel } from "../abstracts/component";

class ProductItemComponent extends Component<ComponentModel> {
    private ViewDetailsButton = '.view-details';

    protected OnInitStart(): void {
    }

    protected OnEventsRegistration(): void {
        $(this.ViewDetailsButton).on(this.Event('click'), (event) => {
            openModal();
        });
    }

    protected OnValidationRegistration(): void {

    }

    protected OnInitFinished(): void {
    }

}

export const ProductItem = new ProductItemComponent();