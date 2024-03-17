import { Component, ComponentModel } from '../abstracts/component';
import { ProductItem } from './product-item';


class ProductListingComponent extends Component<ComponentModel> {
    constructor() {
        super();
        this.AddChildren(ProductItem);
    }

    protected OnInit(): void {
        ProductItem.OnProductConsultation(product => {
            $('#product-consultation').text(`Consulting: ${product.longDescription}`);
        })
    }
}

export const ProductListing = new ProductListingComponent();