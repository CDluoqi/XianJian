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
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fire = null;
        _this.image = null;
        _this.head = null;
        _this.imagehead = null;
        return _this;
    }
    MainUI.prototype.childrenCreated = function () {
        console.log("");
        this.fire.items[0].props = { loop: true };
        this.fire.play();
        this.image.parent.mask = new egret.Rectangle(0, 0, this.image.parent.width, this.image.parent.height);
        this.head.items[0].props = { loop: true };
        this.head.play();
        this.imagehead.parent.mask = new egret.Rectangle(0, 0, this.imagehead.parent.width, this.imagehead.parent.height);
    };
    return MainUI;
}(BaseUI));
__reflect(MainUI.prototype, "MainUI");
//# sourceMappingURL=MainUI.js.map