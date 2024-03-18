import { DomainEvent } from "./domain-event";
import { Product } from "../models/product";


export const ProductEvents = {
    DetailsRetrieved: new DomainEvent<Product>(),
    AddedToCart: new DomainEvent<number>()
};
