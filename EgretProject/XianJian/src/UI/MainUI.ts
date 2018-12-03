class MainUI extends BaseUI
{
    private fire: egret.tween.TweenGroup = null;
    private image: eui.Image = null;
    private head: egret.tween.TweenGroup = null;
    private imagehead: eui.Image = null;

    protected childrenCreated(): void
    {
        console.log("");
        this.fire.items[0].props = {loop:true};
        this.fire.play();

        this.image.parent.mask = new egret.Rectangle(0,0,this.image.parent.width, this.image.parent.height);
        
        this.head.items[0].props = {loop:true};
        this.head.play();
        this.imagehead.parent.mask = new egret.Rectangle(0,0,this.imagehead.parent.width, this.imagehead.parent.height);
    }

}