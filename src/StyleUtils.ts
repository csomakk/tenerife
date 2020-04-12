export class StyleUtils {

    static appendStyle(element:Element, key:string, value: string) {
        var style = element.getAttribute("style");
        if (!style) {
            style = "";
        }
        var styles = style.split(";");        
        styles.push(key + ":" + value);
        element.setAttribute("style", styles.join(";"));
    }

    static updateStyle(element:Element, key:string, value: string) {
        const style = element.getAttribute("style");    
        if (!style) {
            StyleUtils.appendStyle(element, key, value);
            return;
        }
        const styles = style.split(";");
        const foundStyleEntry = styles.findIndex(element => element.indexOf(key + ":") == 0);
        styles[foundStyleEntry] = value;        
        element.setAttribute("style", styles.join(";"));
    }

    static getStyle(element:Element, key:string):string {
        const style = element.getAttribute("style");
        if (!style) {
            return "";
        }
        const styles = style.split(";");
        const foundStyleEntry = styles.find(element => element.indexOf(key + ":") == 0);
        if (!foundStyleEntry) return "";
        return foundStyleEntry.split(":")[1];
    }
}