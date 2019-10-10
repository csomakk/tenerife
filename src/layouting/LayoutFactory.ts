import * as PIXI from 'pixi.js';

import defaultLayout from '../../resources/default/landscape/generic/layout-game.json'
import constraints from '../../resources/default/landscape/generic/constraints.json'
import { ImageFactory } from './factories/ImageFactory';
import { DefaultFactory } from './factories/DefaultFactory';
import { TraxeLayout } from './TraxeLayout.js';

export class LayoutFactory {
    public buildLayoutFromRoot(stage:PIXI.Container) {
        var text = new PIXI.Text("loading");
        stage.addChild(text);
        this.createChildren(stage, defaultLayout.game.children);
    }

    createChildren(parent:PIXI.Container, children:Array<Object>) {
        children.forEach(element => {
            this.createElement(parent, element);    
        });
    }


    createElement(parent:PIXI.Container, layout:any) {
        var type = this.getTypeFromLayout(layout);
        var factory = this.getFactoryByType(type);
        var element = factory.create(layout);
        if (layout["traxeLayout"] != null) {
            this.applyLayout(element, layout["traxeLayout"]);
        }
        if (layout["id"]) {
            element.name = layout["id"];
        }
        if (layout["children"]) {
            this.createChildren(element, layout["children"])
        }
        parent.addChild(element);
    }

    getTypeFromLayout(layout:any) {
        if (layout["imageSource"] != null)  {
            return "image";
        }
    } 

    getFactoryByType(type:any):any {
        if (type == "image") {
            return new ImageFactory();
        }
        return new DefaultFactory();
    } 

    applyLayout(element:PIXI.Container, layout:TraxeLayout) {
        const pixelPerColumn = 800 / constraints.columns;
        const pixelPerRow = 600 / constraints.rows;
        let containWidth = layout.columnSpan * pixelPerColumn;
        let containHeight = layout.rowSpan * pixelPerRow;
       
        let top = layout.column * pixelPerColumn;
        let left = layout.column * pixelPerColumn;
        let right = left + containWidth;
        let bottom = top + containHeight;
        let elementAspect = element.width / element.height;
        let containAspect = containWidth / containHeight;
        

        console.log('applyLayout', element.name);
        element.position.x = left;
        element.position.y = right;
        


        if (layout.anchor != null && layout.anchor.x != null) {
            (element as PIXI.Sprite).anchor.x = layout.anchor.x;
        }
        if (layout.anchor != null && layout.anchor.y != null) {
            (element as PIXI.Sprite).anchor.y = layout.anchor.y;
        }
        
        if (layout.verticalAlign == "center") {
            element.position.y = containHeight / 2;
            if (element instanceof PIXI.Sprite) {
               // (element as PIXI.Sprite).anchor.y = 0.5
            }
        }

        if (layout.horizontalAlign == "center") {
            element.position.x = containWidth / 2;
            if (element instanceof PIXI.Sprite) {
                //(element as PIXI.Sprite).anchor.x = 0.5
            }
        }
        if (layout.column != null) {
            element.position.x = layout.column * pixelPerColumn;
        }
        if (layout.row != null) {
            element.position.y = layout.row * pixelPerRow;
        }
        if (layout.scaling == "fill") {
            if (containAspect < elementAspect) {
                element.height = containHeight;
                element.width = containWidth / containAspect
            } else {
                element.width = containWidth;
                element.height = containHeight * containAspect;
            }
        }
        if (layout.scaling == "proportional") {
            if (containAspect > elementAspect) {
                element.height = containHeight;
                element.width = containWidth / containAspect
            } else {
                element.width = containWidth;
            }
        }

        if (layout.horizontalAlign == "center") {
            element.position.x = containWidth / 2 - element.width / 2
        }
        
    }

}