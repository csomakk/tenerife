import { Mediator } from "./Mediator";
import { Animator } from './Animator';
import { Factory } from './Factory';

export class BunnyMark extends Mediator {
    
    speedX:number;
    speedY:number;
    positionX:number = 0;
    positionY:number = 0;
    static gravity = 0.75;
    static boundsTop = 0;
    static boundsLeft = 0;
    static boundsRight = 800;
    static boundsBottom = 800;

    init() {
        this.speedX = Math.random() * 10;
        this.speedY = (Math.random() * 10) - 5;
        Animator.addAnimation(this.update.bind(this));
    }

    update() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;
        this.speedY += BunnyMark.gravity;
    
        if (this.positionX > BunnyMark.boundsRight) {
            this.speedX *= -1;
            this.positionX = BunnyMark.boundsRight;
        } else if (this.positionX < BunnyMark.boundsLeft) {
            this.speedX *= -1;
            this.positionX = BunnyMark.boundsLeft;
        }
    
        if (this.positionY > BunnyMark.boundsBottom) {
            this.speedY *= -0.85;
            this.positionY = BunnyMark.boundsBottom;
            if (Math.random() > 0.5) {
                this.speedY -= Math.random() * 6;
            }
        } else if (this.positionY < BunnyMark.boundsTop) {
            this.speedY = 0;
            this.positionY = BunnyMark.boundsTop;
        }

        Factory.updatePosition(this.view as Element, this.positionX, this.positionY );
    }

}