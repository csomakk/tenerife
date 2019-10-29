import { PixiAppManager } from './pixi/pixiAppManager';

var appManager = new PixiAppManager();
appManager.createApp();

const bunny = PIXI.Sprite.from('/bunny.png');
appManager.app.stage.addChild(bunny);