import { Component } from "../abstracts/component";
import { ComponentModel } from "../abstracts/component-model";
import { ProductEvents } from "../events/product-events";

class HeaderComponent extends Component<ComponentModel> {
    protected OnInit(): void {
        ProductEvents.AddedToCart.Subscribe(count => {
            $('#cart-counter').text(count);
        });
    }
}

export const Header = new HeaderComponent();