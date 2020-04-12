import { Mediator } from "./Mediator";

export class DateMediator extends Mediator {
    
    init() {
        (this.view as Element).innerHTML = new Date().toDateString();
    }

}