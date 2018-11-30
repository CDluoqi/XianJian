class LoginUI extends BaseUI
    {
        private noticeBtn: eui.Button;
        private noticePanel: eui.Group;
        private noticeClose:eui.Image;
        private noticeScroller:eui.Scroller;
        private noticeContent:eui.Label;

        private loginBtn: eui.Button;

        private loginCallBack:Function;
        private callBackObj:any;

        protected childrenCreated(): void
        {
            super.childrenCreated();
        
            this.noticePanel.visible = false;

            this.noticeScroller.verticalScrollBar.autoVisibility = false;
            this.noticeScroller.verticalScrollBar.visible = false;

            this.noticeClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickNoticePanel, this);

            this.noticeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClickNoticeBtn, this);

            this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnLogin,this);

            this.noticeContent.textFlow = (new egret.HtmlTextParser).parser(
    '<font size=20>Text in </font>'
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
    }

        private OnClickNoticeBtn():void
        {
            this.noticePanel.visible = true;
        }

        private OnClickNoticePanel():void
        {
            this.noticePanel.visible = false;
        }

        private OnLogin():void
        {
            this.loginCallBack.apply(this.callBackObj);
        }

        public SetLoginListener(callback:Function, thisObject:any):void
        {
            this.callBackObj = thisObject;
            this.loginCallBack = callback;
        }

    }