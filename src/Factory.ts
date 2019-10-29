import { DateMediator } from './dateMediator';
import { Ticker } from 'pixi.js';

export class Factory {

    linkMediator(item:any, mediatorKey:any) {
        switch (mediatorKey) {
            case "dateText" : {
                item.mediatorInstance = new DateMediator();
                break;
            }
        }
        if (item.mediatorInstance) {
            item.mediatorInstance.view = item;
            item.mediatorInstance.init();
        }
    }

    createItem(data:any):any {
        switch (data.type) {
            case "sprite" : {
                return PIXI.Sprite.from(data.textureUrl);
            }
            case "text" : {
                return new PIXI.Text("");
            }
            default: {
                return new PIXI.Container();
            }
        }   
    }

    addAnimationIfNeeded(element:any, ticker:Ticker) {
        if (element.onTick != null) {
            ticker.add((delta) => {                
                if (element.onTick.rotate != null) {
                    element.rotation += element.onTick.rotate * delta;
                }
            });
        }
    }

    createChildren(parent:PIXI.Container, designJson:any, ticker: PIXI.Ticker) {
        designJson.forEach((element:any) => {
            let newItem = this.createItem(element);
            
            for (let key in element) {
                if (["children", "mediator"].indexOf(key) == -1) {
                    newItem[key] = element[key];
                }
            }

            if (element.children) {
                this.createChildren(newItem, element.children, ticker);
            }
    
            this.linkMediator (newItem, element.mediator);
            this.addAnimationIfNeeded(newItem, ticker)
            
            parent.addChild(newItem);
        });
    }
}