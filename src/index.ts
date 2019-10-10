import { PixiAppManager } from './pixi/pixiAppManager';
import { LayoutFactory } from './layouting/LayoutFactory';

var appManager = new PixiAppManager();
appManager.createApp();

var layoutFactory = new LayoutFactory();
layoutFactory.buildLayoutFromRoot(appManager.app.stage);
