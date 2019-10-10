import * as PIXI from 'pixi.js';

export class ImageFactory {
    public create(layout:any) {
        let pathPre = "default/generic/scale-2/"
        let sprite = PIXI.Sprite.from(pathPre + layout["imageSource"]);
        return sprite;
    }
}