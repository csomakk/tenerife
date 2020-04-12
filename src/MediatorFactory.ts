import { DateMediator } from './dateMediator';
import { BunnyMark } from './bunnyMark';

export function linkMediator(item:any, mediatorKey:any) {
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
