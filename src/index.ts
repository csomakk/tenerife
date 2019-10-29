import { PixiAppManager } from './pixi/pixiAppManager';

var appManager = new PixiAppManager();
appManager.createApp();

fetch("/magic.json")
    .then(response => response.json())
    .then(body => {
    console.log('weee');
    body.childs.forEach((element:any) => {
        let newItem:PIXI.DisplayObject;
        if (element.type == "sprite") {
            newItem = PIXI.Sprite.from(element.textureUrl);
        }
        if (element.position != null) {
            newItem.position = element.position;
        }
        if (element.position != null) {
            newItem.name = element.name;
        }
        if (element.onTick != null) {
            appManager.app.ticker.add((delta) => {
                console.log('tick');
                if (element.onTick.rotate != null) {
                    newItem.rotation += element.onTick.rotate * delta;
                }
               
            });
        }
        
        appManager.app.stage.addChild(newItem);
    });
});

