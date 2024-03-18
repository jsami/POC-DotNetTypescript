import { DomainEvent } from "../common/events/domain-event";
import { Product } from "../models/product";


export const ProductEvents = {
    ConsultProduct: new DomainEvent<Product>(),
    AddToCart: new DomainEvent<number>()
};
