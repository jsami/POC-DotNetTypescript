import { Component, ComponentModel } from "../abstracts/component";
import { ProductEvents } from "../events/product-events";
import { Product } from "../models/product";

class ProductItemComponent extends Component<ComponentModel> {
    private readonly ViewDetailsButton = '.view-details';
    private readonly AddToCartButton = '.add-to-cart';

    protected OnInit(): void {
        $(this.ViewDetailsButton).on(this.Event('click'), (event) => {
            let productId = $(event.currentTarget).data('product-id');
            $.get(`/Product/${productId}`)
                .then((product: Product) => {
                    ProductEvents.ConsultProduct.Publish(product);
                }).fail(error => {
                    console.error(error);
                });
        });

        $(this.AddToCartButton).on(this.Event('click'), (event) => {
            let productId = $(event.currentTarget).data('product-id');
            let json = JSON.stringify({
                id: productId
            });

            $.post({
                url: `/Product/add-to-cart`,
                data: json,
                contentType: 'application/json'
            }).then((count: number) => {
                ProductEvents.AddToCart.Publish(count);
            }).fail(error => {
                console.error(error);
            });
        });
    }
}

export const ProductItem = new ProductItemComponent();
