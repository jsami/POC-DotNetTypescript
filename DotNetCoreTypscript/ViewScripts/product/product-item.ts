import { Component, ComponentModel } from "../abstracts/component";

class ProductItemComponent extends Component<ComponentModel> {

    protected OnInitStart(): void {
    }

    protected OnEventsRegistration(): void {
    }

    protected OnValidationRegistration(): void {
    }

    protected OnInitFinished(): void {
    }

}

export const ProductItem = new ProductItemComponent();