import * as PIXI from 'pixi.js';

export class DefaultFactory {
    public create(layout:any) {
        let displayObject:PIXI.Container = new PIXI.Container();
        return displayObject;
    }
}