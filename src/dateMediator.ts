import { Mediator } from "./Mediator";

export class DateMediator extends Mediator {
    
    init() {
        console.log('initing');
        (this.view as Element).innerHTML = new Date().toDateString();
    }

}