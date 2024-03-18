import { DomainEvent } from "./domain-event";

export const ComponentEvents = {
    ReinitRequested: new DomainEvent<number>()
}