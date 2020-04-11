import { Factory } from './Factory';

fetch("/magic.json")
    .then(response => response.json())
    .then(body => {
        var factory = new Factory();
        factory.createChildren(window.document.body, body.childs);
});

