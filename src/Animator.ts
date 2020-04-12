export class Animator {

    static lastFrameAt = 0;
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
        
        if (!Animator.lastFrameAt) {
            Animator.lastFrameAt = timestamp;
        }
        var delta = timestamp;
        
        Animator.animRenderCallbacks.forEach((callback:any) => {
            callback(delta);
        });
        Animator.stats.end();
    }

}