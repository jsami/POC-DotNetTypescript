import { Component, ComponentModel } from "../abstracts/component";
import { Product } from "./models/product";

class ProductItemComponent extends Component<ComponentModel> {
    private readonly ViewDetailsButton = '.view-details';

    protected OnInit(): void {
        $(this.ViewDetailsButton).on(this.Event('click'), (event) => {
            openModal();
        });
    }

    OnProductConsultation(callback: (product: Product) => void) {
        $(this.ViewDetailsButton).on(this.Event('click'), (event) => {
            let productId = $(event.currentTarget).data('product-id');
            $.get(`/Product/${productId}`)
                .then((product: Product) => {
                    callback(product);
                }).fail(error => {
                    console.error(error);
                });
        });
    }
}

export const ProductItem = new ProductItemComponent();