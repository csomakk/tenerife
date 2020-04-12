import { Factory } from './Factory';
var Stats = require('../node_modules/stats.js')
import { Animator } from './Animator';

fetch("/magic.json")
    .then(response => response.json())
    .then(body => {
        var factory = new Factory();
        factory.createChildren(window.document.body, body.childs);
});

var stats = new Stats();
document.body.appendChild( stats.dom );

Animator.init(stats);