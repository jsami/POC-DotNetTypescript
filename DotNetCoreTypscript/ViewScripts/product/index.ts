import { Component, ComponentModel } from '../abstracts/component';
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
        ProductItem.OnProductConsultation(product => {
            $('#product-consultation').text(`Consulting: ${product.longDescription}`);
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
        })

        const submitOrderBtn = $('#submitOrder');
        const customerNameValid$ = this.ValidationObservableOf(customerName);
        const customerEmailValid$ = this.ValidationObservableOf(customerEmail);
        const selectedProductValid$ = this.ValidationObservableOf(selectedProduct);

        this.AllValid(customerNameValid$, customerEmailValid$, selectedProductValid$)
            .subscribe(isValid => {
                if (isValid) {
                    submitOrderBtn.removeAttr('disabled');
                } else {
                    submitOrderBtn.attr('disabled', 'disabled');
                }
            });
    }
}

export const ProductListing = new ProductListingComponent();