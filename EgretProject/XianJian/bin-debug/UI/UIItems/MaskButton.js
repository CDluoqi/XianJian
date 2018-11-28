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
var MaskButton = (function (_super) {
    __extends(MaskButton, _super);
    function MaskButton() {
        return _super.call(this) || this;
    }
    MaskButton.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.mask = new egret.Rectangle(0, 0, this.width, this.height);
    };
    return MaskButton;
}(eui.Button));
__reflect(MaskButton.prototype, "MaskButton");
//# sourceMappingURL=MaskButton.js.map