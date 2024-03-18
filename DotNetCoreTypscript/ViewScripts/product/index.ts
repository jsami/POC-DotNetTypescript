import { Component, ComponentModel } from '../abstracts/component';
import { ProductEvents } from '../events/product-events';
import { ProductItem } from './product-item';


class ProductListingComponent extends Component<ComponentModel> {
    private readonly CustomerName = '#customerName';
    private readonly CustomerEmail = '#customerEmail';
    private readonly ProductSelection = '#productSelection';

    constructor() {
        super();
        this.AddChildren(ProductItem);
    }

    protected OnInit(): void {

        ProductEvents.ConsultProduct.Subscribe(product => {
            $('#product-consultation').text(`Consulting: ${product.longDescription}`);
        });

        ProductEvents.AddToCart.Subscribe(count => {
            $('#product-consultation').text(`${count} products added to cart.`);
        });

        const customerName = $(this.CustomerName)[0];
        const customerEmail = $(this.CustomerEmail)[0];
        const selectedProduct = $(this.ProductSelection)[0];

        this.Validate(customerName, (element) => {
            let currentValue = $(element).val();
            let isValid = typeof(currentValue) === 'string' && currentValue.length > 3;
            return isValid;
        });

        this.Validate(customerEmail, (element) => {
            let currentValue = $(element).val();
            let isValid = typeof(currentValue) === 'string' 
                && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValue);
            return isValid;
        });

        this.Validate(selectedProduct, (element) => {
            let currentValue = $(element).val();
            let isValid = typeof(currentValue) === 'string' && parseInt(currentValue) > 0;
            return isValid;
        });
        
        const customerNameValid$ = this.ObservableValidationOf(customerName);
        const customerEmailValid$ = this.ObservableValidationOf(customerEmail);
        const selectedProductValid$ = this.ObservableValidationOf(selectedProduct);

        this.AllValid(customerNameValid$, customerEmailValid$, selectedProductValid$)
            .subscribe(isValid => {
                const submitOrderBtn = $('#submitOrder');
                if (isValid) {
                    submitOrderBtn.removeAttr('disabled');
                } else {
                    submitOrderBtn.attr('disabled', 'disabled');
                }
            });
    }
}

export const ProductListing = new ProductListingComponent();