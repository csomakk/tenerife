import { DateMediator } from './dateMediator';

export class Factory {
    createChildren(parent:PIXI.Container, designJson:any, ticker: PIXI.Ticker) {
        designJson.forEach((element:any) => {
            let newItem:any;
            switch (element.type) {
                case "sprite" : {
                    newItem = PIXI.Sprite.from(element.textureUrl);
                    break;
                }
                case "text" : {
                    newItem = new PIXI.Text("");
                    break;
                }
                default: {
                    newItem = new PIXI.Container();
                    break;
                }
            }   
    
            for (let key in element) {
                if (["children", "mediator"].indexOf(key) == -1) {
                    newItem[key] = element[key];
                }
            }

            if (element.children) {
                this.createChildren(newItem, element.children, ticker);
            }
    
            switch (element.mediator) {
                case "dateText" : {
                    newItem.mediatorInstance = new DateMediator();
                    
                    break;
                }
            }
            if (newItem.mediatorInstance) {
                newItem.mediatorInstance.view = newItem;
                newItem.mediatorInstance.init();
            }
    
            if (element.onTick != null) {
                ticker.add((delta) => {                
                    if (element.onTick.rotate != null) {
                        newItem.rotation += element.onTick.rotate * delta;
                    }
                });
            }
            
            parent.addChild(newItem);
        });
    }
}