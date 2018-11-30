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
var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.noticePanel.visible = false;
        this.noticeScroller.verticalScrollBar.autoVisibility = false;
        this.noticeScroller.verticalScrollBar.visible = false;
        this.noticeClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickNoticePanel, this);
        this.noticeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickNoticeBtn, this);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnLogin, this);
        this.noticeContent.textFlow = (new egret.HtmlTextParser).parser('<font size=20>Text in </font>'
            + '<font color=0x336699 size=60 strokecolor=0x6699cc stroke=2>Egret</font>'
            + '<font fontfamily="Impact"> can </font>'
            + '<font fontfamily="Times New Roman "><u>be set </u></font>'
            + '<font color=0xff0000>to a </font>'
            + '<font> \n </font>'
            + '<font color=0x00ff00>variety </font>'
            + '<font color=0xf000f0>of </font>'
            + '<font color=0x00ffff>styles </font>'
            + '<font size=56>with </font>'
            + '<font size=16>different </font>'
            + '<font size=26>colors, </font>'
            + '<font> \n </font>'
            + '<font color=0x00ff00><i>fonts </i></font>'
            + '<font size=26 color=0xf000f0 fontfamily="Quaver">and </font>'
            + '<font color=0xf06f00><i>sizes</i></font>');
    };
    LoginUI.prototype.OnClickNoticeBtn = function () {
        this.noticePanel.visible = true;
    };
    LoginUI.prototype.OnClickNoticePanel = function () {
        this.noticePanel.visible = false;
    };
    LoginUI.prototype.OnLogin = function () {
        this.loginCallBack.apply(this.callBackObj);
    };
    LoginUI.prototype.SetLoginListener = function (callback, thisObject) {
        this.callBackObj = thisObject;
        this.loginCallBack = callback;
    };
    return LoginUI;
}(BaseUI));
__reflect(LoginUI.prototype, "LoginUI");
//# sourceMappingURL=LoginUI.js.map