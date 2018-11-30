var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.content = null;
        _this.player = null;
        _this.pointer = null;
        _this.tiledMap = null;
        return _this;
    }
    Scene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.content = new eui.Group();
        this.content.width = 256 * 10;
        this.content.height = 256 * 8;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 10; j++) {
                var image = new eui.Image("FB0055_" + i + "_" + j + "_jpg");
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
        this.content.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegan, this);
        var txtrP = RES.getRes("UI005_png");
        var dataP = RES.getRes("UI005_json");
        var pointerFactory = new egret.MovieClipDataFactory(dataP, txtrP);
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
        var startPoint = this.tiledMap.GetStartPoint();
        this.player.x = startPoint.x;
        this.player.y = startPoint.y;
        console.log(startPoint.y + "  " + startPoint.x);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    Scene.prototype.ToMapPos = function (posx, posy) {
        var targetX = ((this.stage.stageWidth) / 2) - posx;
        var targetY = ((this.stage.stageHeight) / 2) - posy;
        if (targetX > 0) {
            targetX = 0;
        }
        if (targetY > 0) {
            targetY = 0;
        }
        this.content.x = targetX;
        this.content.y = targetY;
    };
    Scene.prototype.touchBegan = function (e) {
        var touchX = e.stageX;
        var touchY = e.stageY;
        var targetX = touchX - this.content.x;
        var targetY = touchY - this.content.y;
        var path = this.tiledMap.FindPath(new egret.Point(this.player.x, this.player.y), new egret.Point(targetX, targetY));
        if (path != null) {
            this.pointer.visible = true;
            this.pointer.x = targetX;
            this.pointer.y = targetY;
            this.pointer.play(-1);
            this.player.MoveByPath(path);
        }
    };
    Scene.prototype.moveEnd = function () {
        this.pointer.stop();
        this.pointer.visible = false;
    };
    Scene.prototype.update = function () {
        this.ToMapPos(this.player.x, this.player.y);
    };
    return Scene;
}(eui.Group));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map