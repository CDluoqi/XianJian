class MaskButton extends eui.Button
{
    public constructor()
    {
         super();
    }  
 
    protected childrenCreated():void
    {
        super.childrenCreated();
        this.mask = new egret.Rectangle(0,0,this.width, this.height);
    }
}