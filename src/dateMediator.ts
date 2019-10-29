import { Mediator } from "./Mediator";

export class DateMediator extends Mediator{
    
    init() {
        console.log('initing');
        (this.view as PIXI.Text).text = "2019"
    }

}