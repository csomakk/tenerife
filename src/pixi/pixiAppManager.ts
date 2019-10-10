import * as PIXI from 'pixi.js';

export class PixiAppManager {

    app:PIXI.Application;

    public createApp() {
        this.app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x1099bb });
        document.body.appendChild(this.app.view);
        this.registerPixiInspector();
    }

    registerPixiInspector() {
        (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }
}