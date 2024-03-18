import { Subject } from "rxjs";

export class DomainEvent<TEventArg> {
    private readonly EventSubject = new Subject<TEventArg>();


    Publish(arg: TEventArg) {
        this.EventSubject.next(arg);
    }

    Subscribe(observer: (arg: TEventArg) => void) {
        this.EventSubject.subscribe(observer);
    }
}

