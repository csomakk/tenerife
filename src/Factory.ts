import { Animator } from './Animator';
import { linkMediator } from './MediatorFactory';
import { StyleUtils } from './StyleUtils';

export class Factory {

    createItem(data:any, parent:Node):Node {
        switch (data.type) {
            case "sprite" : {
                var newImg = document.createElement("img");
                newImg.src = data.textureUrl;
                return newImg;
            }
            case "text" : {
                var newDiv = document.createElement("div");
                newDiv.innerText = data.text || "";
            }
            default: {
                var newDiv = document.createElement("div");
            }
        }   
        return newDiv;
    }

    addAnimationIfNeeded(element:any) {        
        var thisRef = this;
        if (element.onTick != null) {            
            Animator.addAnimation((delta:number) => {                
                if (element.onTick.rotate != null) {
                    thisRef.addToRotation(element, element.onTick.rotate * delta);
                }
            });
        }
    }

    addToRotation(element:Element, amountInDegree:number) {
        var transform = StyleUtils.getStyle(element, "transform");
        var currentRotation = 0;
        if (transform.indexOf("rotate(") != -1) {
            currentRotation = parseFloat(transform.split("rotate(")[1].split("deg")[0]);
        }
        
        var newRotation = currentRotation + amountInDegree;
        StyleUtils.updateStyle(element, "transform", "transform: rotate(" + newRotation + "deg)");            
    }

    static updatePosition(element:Element, x:number, y:number) {
        element.setAttribute("style", "transform: translate("+ x + "px," + y + "px);position:absolute;");    
    }

    createChildren(parent:Node, designJson:any) {
        designJson.forEach((element:any) => {
            let newItem = this.createItem(element, parent);
            
            for (let key in element) {
                switch (key) {
                    case "position": 
                        StyleUtils.appendStyle((newItem as Element), "left", element[key].x + "px");
                        StyleUtils.appendStyle((newItem as Element), "top", element[key].y + "px");
                        StyleUtils.appendStyle((newItem as Element), "position", "absolute");
                        break;
                    case "text": 
                        (newItem as Element).innerHTML = element[key];
                        break;
                    case "anchor": 
                            StyleUtils.appendStyle((newItem as Element), "transform", "translate("+ element[key].x * -100 + "%, "+element[key].y * -100+"%)");                            
                            StyleUtils.appendStyle((newItem as Element), "position", "absolute");
                        break;                
                    case "multiply": {
                        for (var i = 0; i < element[key]; i++) {
                            var multipliedItem = this.createItem(element, parent);
                            parent.appendChild(multipliedItem);
                            linkMediator(multipliedItem, element.mediator);
                        }
                    }
                }
                if (["children", "mediator"].indexOf(key) == -1) {
                    (newItem as any)[key] = element[key];            
                }
            }

            if (element.children) {
                this.createChildren(newItem, element.children);
            }
    
            linkMediator(newItem, element.mediator);
            this.addAnimationIfNeeded(newItem)
            
            parent.appendChild(newItem);
        });
    }
}