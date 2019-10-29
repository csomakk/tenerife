import { PixiAppManager } from './pixi/pixiAppManager';

var appManager = new PixiAppManager();
appManager.createApp();

fetch("/magic.json")
    .then(response => response.json())
    .then(body => {
    console.log('weee');
    body.childs.forEach((element:any) => {
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
        }

        for (let key in element) {
            newItem[key] = element[key];
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

