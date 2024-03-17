import { Component, ComponentModel } from '../abstracts/component';
import { ProductItem } from './product-item';



class ProductListingComponent extends Component<ComponentModel> {
    constructor() {
        super();
        this.AddChildren(ProductItem);
    }

    protected OnInitStart(): void {
    }

    protected OnEventsRegistration(): void {
    }

    protected OnValidationRegistration(): void {
    }

    protected OnInitFinished(): void {
    }

}

export const ProductListing = new ProductListingComponent();