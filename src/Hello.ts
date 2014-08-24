class Hello extends egret.DisplayObjectContainer{

    /**测试用的位图*/
    private numberObj:egret.TextField;

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.startGame,this);
    }
    /**游戏启动后，会自动执行此方法*/
    public startGame():void {
        this.loadResource();
    }
    /**加载所需资源*/
    private loadResource():void {

        //使用资源管理器加载资源
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.loadConfig("resource/clickme/resource.json","resource/clickme/");
        RES.loadGroup("main");
    }

    /**加载完毕后即可使用*/
    private onResourceLoadComplete(event:RES.ResourceEvent):void {

        var container = new egret.DisplayObjectContainer();
        container.width = this.stage.stageWidth;
        container.height = this.stage.stageWidth;
        this.addChild(container);

        var bg = new egret.Bitmap();//创建位图
        bg.width = this.stage.stageWidth;
        bg.texture = RES.getRes("bg.background");//设置纹理
        container.addChild(bg);//添加到显示列表

        var greenBtn = new egret.Bitmap();//创建位图
        greenBtn.x = 120;
        greenBtn.y = 200;
        greenBtn.anchorY = 1;
        greenBtn.touchEnabled = true;
        greenBtn.name = 'green';
        greenBtn.texture = RES.getRes("bg.green");//设置纹理

        var yellowBtn = new egret.Bitmap();//创建位图
        yellowBtn.x = 260;
        yellowBtn.y = 200;
        yellowBtn.anchorY = 1;
        yellowBtn.touchEnabled = true;
        yellowBtn.name = 'yellow';
        yellowBtn.texture = RES.getRes("bg.yellow");//设置纹理

        greenBtn.width = yellowBtn.width = 90;
        greenBtn.height = yellowBtn.height = 50;

        container.addChild(greenBtn);//添加到显示列表
        container.addChild(yellowBtn);//添加到显示列表

        var self = this;
        greenBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchStart,greenBtn);
        greenBtn.addEventListener(egret.TouchEvent.TOUCH_END,function(e){
            self.touchEnd(e);
            self.numberPlus(e);
        },greenBtn);
        yellowBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchStart,yellowBtn);
        yellowBtn.addEventListener(egret.TouchEvent.TOUCH_END,function(e){
            self.touchEnd(e);
            self.numberPlus(e);
        },yellowBtn);

        this.numberObj = new egret.TextField();//创建TextField实例
        //label1.fontFamily = "Impact";//设置字体，中文慎用，受系统和浏览器限制，表现可能不一致
        this.numberObj.textColor = 0x556b45;//设置颜色，和Flash一样，设置16进制的数值
        this.numberObj.textAlign = "center";
        this.numberObj.text = "100";
        this.numberObj.width = 60;
        this.numberObj.size = 32;
        this.numberObj.x = 250;
        this.numberObj.y = 80;
        container.addChild(this.numberObj);//添加到显示列表
    }

    private touchStart(event:egret.TouchEvent):void {
        if(event.currentTarget.name == 'green'){
            event.currentTarget.texture = RES.getRes("bg.greenHover");
        }else{
            event.currentTarget.texture = RES.getRes("bg.yellowHover");
        }
    }
    private touchEnd(event:egret.TouchEvent):void {
        if(event.currentTarget.name == 'green'){
            event.currentTarget.texture = RES.getRes("bg.green");
        }else{
            event.currentTarget.texture = RES.getRes("bg.yellow");
        }
    }
    private numberPlus(event:egret.TouchEvent){

        var no = parseInt(this.numberObj.text) - 1;
        if(no == 0){
            alert('过关');
            return;
        }
        this.numberObj.text = no.toFixed();
    }
}