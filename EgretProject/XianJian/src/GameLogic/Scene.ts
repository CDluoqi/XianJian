class Scene extends eui.Group
{
    private content:eui.Group = null;
    private player:Player = null;
    private pointer:egret.MovieClip = null;
    private tiledMap:TiledMap = null;

    public constructor() 
    {
        super();
    }

    protected createChildren()
    {
        super.createChildren();

        this.content = new eui.Group();
        this.content.width = 256 * 10;
        this.content.height = 256 * 8;
        for(let i = 0; i < 8; i++)
        {
            for(let j = 0; j < 10; j++){
                let image =  new eui.Image("FB0055_" + i + "_" + j + "_jpg");
                this.content.addChild(image);
                image.x = j * 256;
                image.y = i * 256;
                image.width = 256;
                image.height = 256;
            }
        }
        this.content.x = -100;
        this.content.y = -200;
        this.addChild(this.content);
        this.content.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegan,this)

        var txtrP = RES.getRes("UI005_png");
        var dataP = RES.getRes("UI005_json");
        var pointerFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( dataP, txtrP );
        this.pointer = new egret.MovieClip(pointerFactory.generateMovieClipData("UI005"));
        this.content.addChild(this.pointer);
        this.pointer.anchorOffsetX = 0.5;
        this.pointer.anchorOffsetY = 1;
        this.pointer.frameRate = 10;
        this.pointer.visible = false;

        this.player = new Player();
        this.content.addChild(this.player);
        this.tiledMap = new TiledMap();
        this.tiledMap.Init();
        let startPoint = this.tiledMap.GetStartPoint();
        this.player.x = startPoint.x;
        this.player.y = startPoint.y;
        console.log(startPoint.y + "  " + startPoint.x);
        

        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    public ToMapPos(posx:number, posy:number):void 
    {
        let targetX = ((this.stage.stageWidth) / 2) - posx;
        let targetY =  ((this.stage.stageHeight) / 2) - posy;
        if(targetX > 0)
        {
            targetX = 0;
        }
        if(targetY > 0)
        {
            targetY = 0;
        }
        this.content.x = targetX;
        this.content.y = targetY;     
    }

    private touchBegan(e:egret.TouchEvent)
    {
        var touchX=e.stageX;
        var touchY=e.stageY;

        let targetX = touchX - this.content.x;
        let targetY =  touchY - this.content.y;

        
        let path = this.tiledMap.FindPath(new egret.Point(this.player.x, this.player.y), new egret.Point(targetX, targetY));
        if(path != null)
        {
            this.pointer.visible = true;
            this.pointer.x = targetX;
            this.pointer.y = targetY;
            this.pointer.play(-1);
            this.player.MoveByPath(path);
        }
        
    }

    private moveEnd():void 
    {
        this.pointer.stop();
        this.pointer.visible = false;
    }
    
    private update():void
    {
        this.ToMapPos(this.player.x, this.player.y);
    } 

}