export class Animator {

    static lastFrameAt = new Date().getTime();
    static animRenderCallbacks:any = [];

    static stats:any;

    public static init(stats:any) {
        Animator.stats = stats;
        window.requestAnimationFrame(Animator.renderAnimationFrame);
    }
    
    public static addAnimation(callback:any) {                                   
        Animator.animRenderCallbacks.push(callback);        
    }

    static renderAnimationFrame(timestamp:number) {   
        Animator.stats.begin();
        window.requestAnimationFrame(Animator.renderAnimationFrame);        
        const delta = timestamp - Animator.lastFrameAt;    
        Animator.animRenderCallbacks.forEach((callback:any) => {
            callback(delta);
        });
        Animator.lastFrameAt = timestamp;
        Animator.stats.end();
    }

}