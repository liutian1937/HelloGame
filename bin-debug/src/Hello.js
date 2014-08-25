var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    /**游戏启动后，会自动执行此方法*/
    Hello.prototype.startGame = function () {
        this.loadResource();
    };

    /**加载所需资源*/
    Hello.prototype.loadResource = function () {
        //使用资源管理器加载资源
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadConfig("resource/clickme/resource.json", "resource/clickme/");
        RES.loadGroup("main");
    };

    /**加载完毕后即可使用*/
    Hello.prototype.onResourceLoadComplete = function (event) {
        var container = new egret.DisplayObjectContainer();
        container.width = this.stage.stageWidth;
        container.height = this.stage.stageWidth;
        this.addChild(container);

        var bg = new egret.Bitmap();
        bg.width = this.stage.stageWidth;
        bg.texture = RES.getRes("bg.background"); //设置纹理
        container.addChild(bg); //添加到显示列表

        this.greenBtn = new egret.Bitmap(); //创建位图
        this.greenBtn.x = 120;
        this.greenBtn.y = 200;
        this.greenBtn.anchorY = 1;
        this.greenBtn.touchEnabled = true;
        this.greenBtn.name = 'green';
        this.greenBtn.texture = RES.getRes("bg.green"); //设置纹理

        this.yellowBtn = new egret.Bitmap(); //创建位图
        this.yellowBtn.x = 260;
        this.yellowBtn.y = 200;
        this.yellowBtn.anchorY = 1;
        this.yellowBtn.touchEnabled = true;
        this.yellowBtn.name = 'yellow';
        this.yellowBtn.texture = RES.getRes("bg.yellow"); //设置纹理

        this.greenBtn.width = this.yellowBtn.width = 90;
        this.greenBtn.height = this.yellowBtn.height = 50;

        container.addChild(this.greenBtn); //添加到显示列表
        container.addChild(this.yellowBtn); //添加到显示列表

        this.greenBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
        this.greenBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.yellowBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
        this.yellowBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);

        this.numberObj = new egret.TextField(); //创建TextField实例
        this.numberObj.fontFamily = "Impact"; //设置字体，中文慎用，受系统和浏览器限制，表现可能不一致
        this.numberObj.textColor = 0x556b45; //设置颜色，和Flash一样，设置16进制的数值
        this.numberObj.textAlign = "center";
        this.numberObj.text = "30";
        this.numberObj.width = 60;
        this.numberObj.size = 32;
        this.numberObj.x = 250;
        this.numberObj.y = 80;
        container.addChild(this.numberObj); //添加到显示列表
    };

    Hello.prototype.touchStart = function (event) {
        if (event.currentTarget.name == 'green') {
            event.currentTarget.texture = RES.getRes("bg.greenHover");
        } else {
            event.currentTarget.texture = RES.getRes("bg.yellowHover");
        }
    };
    Hello.prototype.touchEnd = function (event) {
        if (event.currentTarget.name == 'green') {
            event.currentTarget.texture = RES.getRes("bg.green");

            this.numberPlus();
        } else {
            event.currentTarget.texture = RES.getRes("bg.yellow");
            alert('sb');
        }
    };
    Hello.prototype.numberPlus = function () {
        var no = (parseInt(this.numberObj.text) - 1).toFixed(), hash = '15,10,9,5,1';
        if (no == '0') {
            alert('过关');
            return;
        }
        if (hash.indexOf(no) > -1) {
            this.changeBtn();
        }
        this.numberObj.text = no;
    };
    Hello.prototype.changeBtn = function () {
        if (this.greenBtn.name == 'green') {
            this.greenBtn.texture = RES.getRes("bg.yellow");
            this.greenBtn.name = 'yellow';
            this.yellowBtn.texture = RES.getRes("bg.green");
            this.yellowBtn.name = 'green';
        } else {
            this.greenBtn.texture = RES.getRes("bg.green");
            this.greenBtn.name = 'green';
            this.yellowBtn.texture = RES.getRes("bg.yellow");
            this.yellowBtn.name = 'yellow';
        }
    };
    return Hello;
})(egret.DisplayObjectContainer);
