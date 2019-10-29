import { PixiAppManager } from './pixi/pixiAppManager';
import { Factory } from './Factory';

var appManager = new PixiAppManager();
appManager.createApp();

fetch("/magic.json")
    .then(response => response.json())
    .then(body => {
        var factory = new Factory();
        factory.createChildren(appManager.app.stage, body.childs, appManager.app.ticker);
});

