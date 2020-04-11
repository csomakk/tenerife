import { DateMediator } from './dateMediator';
import { Ticker, Transform } from 'pixi.js';

export class Factory {

    linkMediator(item:any, mediatorKey:any) {
        switch (mediatorKey) {
            case "dateText" : {
                item.mediatorInstance = new DateMediator();
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
            console.log('aaa');
            Factory.thisStatic = this;
            window.requestAnimationFrame(this.renderAnimationFrame);
            this.animRenderCallbacks.push((delta:number) => {                
                if (element.onTick.rotate != null) {
                    thisRef.addToRotation(element, element.onTick.rotate * delta / 1000);
                }
            });
        }
    }

    lastFrameAt = 0;
    animRenderCallbacks:any = [];

    static thisStatic:Factory;

    renderAnimationFrame(timestamp:number) {
        var thisRef = Factory.thisStatic;
        window.requestAnimationFrame(thisRef.renderAnimationFrame);
        
        if (!thisRef.lastFrameAt) {
            thisRef.lastFrameAt = timestamp;
        }
        var delta = timestamp;
        
        thisRef.animRenderCallbacks.forEach((callback:any) => {
            callback(delta);
        });
    }

    appendStyle(element:Element, key:string, value: string) {
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
        console.log("update");
        if (!style) {
            this.appendStyle(element, key, value);
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
        console.log('newr', newRotation);
    }



    createChildren(parent:Node, designJson:any) {
        designJson.forEach((element:any) => {
            let newItem = this.createItem(element, parent);
            
            for (let key in element) {
                switch (key) {
                    case "position": 
                        this.appendStyle((newItem as Element), "left", element[key].x + "px");
                        this.appendStyle((newItem as Element), "top", element[key].y + "px");
                        this.appendStyle((newItem as Element), "position", "absolute");
                        break;
                    case "text": 
                        (newItem as Element).innerHTML = element[key];
                        break;
                    case "anchor": 
                            //this.appendStyle((newItem as Element), "transform", "translate("+ element[key].x * -100 + "%, "+element[key].y * -100+"%)");
                            this.appendStyle((newItem as Element), "transform", "rotate(50deg)");
                            this.appendStyle((newItem as Element), "position", "absolute");
                        break;
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