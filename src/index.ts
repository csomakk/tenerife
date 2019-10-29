import { PixiAppManager } from './pixi/pixiAppManager';

var appManager = new PixiAppManager();
appManager.createApp();

fetch("/magic.json")
    .then(response => response.json())
    .then(body => {
    console.log('weee');
    body.childs.forEach((element:any) => {
        var newItem;
        if (element.type == "sprite") {
            newItem = PIXI.Sprite.from(element.textureUrl);
            
        }
        appManager.app.stage.addChild(newItem);
    });
});

