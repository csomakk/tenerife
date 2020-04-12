import { DateMediator } from './dateMediator';
import { Ticker, Transform } from 'pixi.js';
import { Animator } from './Animator';
import { BunnyMark } from './bunnyMark';

export class Factory {

    linkMediator(item:any, mediatorKey:any) {
        switch (mediatorKey) {
            case "dateText" : {
                item.mediatorInstance = new DateMediator();
                break;
            }
            case "bunnyMark": {
                item.mediatorInstance = new BunnyMark();
                break;
            }
        }
        if (item.mediatorInstance) {
            item.mediatorInstance.view = item;
            item.mediatorInstance.init();
        }
    }

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
                    thisRef.addToRotation(element, element.onTick.rotate * delta / 1000);
                }
            });
        }
    }
    
    static appendStyle(element:Element, key:string, value: string) {
        var style = element.getAttribute("style");
        if (!style) {
            style = "";
        }
        var styles = style.split(";");        
        styles.push(key + ":" + value);
        element.setAttribute("style", styles.join(";"));
    }

    updateStyle(element:Element, key:string, value: string) {
        var style = element.getAttribute("style");    
        if (!style) {
            Factory.appendStyle(element, key, value);
            return;
        }
        var styles = style.split(";");
        const foundStyleEntry = styles.findIndex(element => element.indexOf(key + ":") == 0);
        styles[foundStyleEntry] = value;        
        element.setAttribute("style", styles.join(";"));
    }

    getStyle(element:Element, key:string):string {
        var style = element.getAttribute("style");
        if (!style) {
            return "";
        }
        var styles = style.split(";");
        const foundStyleEntry = styles.find(element => element.indexOf(key + ":") == 0);
        if (!foundStyleEntry) return "";
        return foundStyleEntry.split(":")[1];
    }

    addToRotation(element:Element, amountInDegree:number) {
        var transform = this.getStyle(element, "transform");
        var currentRotation = 0;
        if (transform.indexOf("rotate(") != -1) {
            currentRotation = parseFloat(transform.split("rotate(")[1].split("deg")[0]);
        }
        
        var newRotation = currentRotation + amountInDegree;
        this.updateStyle(element, "transform", "transform: rotate(" + newRotation + "deg)");            
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
                        Factory.appendStyle((newItem as Element), "left", element[key].x + "px");
                        Factory.appendStyle((newItem as Element), "top", element[key].y + "px");
                        Factory.appendStyle((newItem as Element), "position", "absolute");
                        break;
                    case "text": 
                        (newItem as Element).innerHTML = element[key];
                        break;
                    case "anchor": 
                            //this.appendStyle((newItem as Element), "transform", "translate("+ element[key].x * -100 + "%, "+element[key].y * -100+"%)");
                            Factory.appendStyle((newItem as Element), "transform", "rotate(50deg)");
                            Factory.appendStyle((newItem as Element), "position", "absolute");
                        break;                
                    case "multiply": {
                        for (var i = 0; i < element[key]; i++) {
                            var multipliedItem = this.createItem(element, parent);
                            parent.appendChild(multipliedItem);
                            this.linkMediator (multipliedItem, element.mediator);
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
    
            this.linkMediator (newItem, element.mediator);
            this.addAnimationIfNeeded(newItem)
            
            parent.appendChild(newItem);
        });
    }
}