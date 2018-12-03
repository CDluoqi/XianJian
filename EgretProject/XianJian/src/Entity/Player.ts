module Global
{
    export enum Direction
    {
        Up_Left,
        Up_Right,
        Down_Left,
        Down_Right
    } 

    export enum Player_State
    {
        Idle,
        Run,
        Use_Skill
    }
}

class Player extends eui.Group
{
    private moviClips:{ [direction: string]: Array<egret.MovieClip>; } = {};

    private weaponClips:{ [direction: string]: Array<egret.MovieClip>; } = {};

    private curClip:egret.MovieClip = null;
    private curWeaponClips:egret.MovieClip = null;

    private moveTween:egret.Tween = null;
    
    private direction_down:string = "es";

    private direction_up:string = "ne";

    private _direction:Global.Direction = Global.Direction.Down_Left;

    private _state:Global.Player_State = Global.Player_State.Idle;
    

    public constructor() 
    {
        super();       
    }

    protected createChildren()
    {
        super.createChildren();

        let esMovieClip: Array<egret.MovieClip> = new Array<egret.MovieClip>();
        let neMovieClip: Array<egret.MovieClip> = new Array<egret.MovieClip>();

        let esWeaponMovieClip: Array<egret.MovieClip> = new Array<egret.MovieClip>();
        let neWeaponMovieClip: Array<egret.MovieClip> = new Array<egret.MovieClip>();

        let idle_es = this.createMovieClip("idle", this.direction_up);
        let idle_ne = this.createMovieClip("idle", this.direction_down);
        let weapon_idle_es = this.createFileClip("idle", this.direction_up);
        let weapon_idle_ne = this.createFileClip("idle", this.direction_down);

        this.addChild(idle_es);
        this.addChild(idle_ne);
        this.addChild(weapon_idle_es);
        this.addChild(weapon_idle_ne);

        idle_es.visible = false;
        idle_ne.visible = false;
        weapon_idle_es.visible = false;
        weapon_idle_ne.visible = false;

        idle_es.frameRate = 10;        
        idle_ne.frameRate = 10;
        weapon_idle_es.frameRate = 10;
        weapon_idle_ne.frameRate = 10;

        esMovieClip[Global.Player_State.Idle] = idle_es;
        neMovieClip[Global.Player_State.Idle] = idle_ne;
        esWeaponMovieClip[Global.Player_State.Idle] = weapon_idle_es;
        neWeaponMovieClip[Global.Player_State.Idle] = weapon_idle_ne;

        let run_es = this.createMovieClip("run", this.direction_up);
        let run_ne = this.createMovieClip("run", this.direction_down);
        let weapon_run_es = this.createFileClip("run", this.direction_up);
        let weapon_run_ne = this.createFileClip("run", this.direction_down);
        
        
        this.addChild(run_es);
        this.addChild(run_ne);
        this.addChild(weapon_run_es);
        this.addChild(weapon_run_ne);

        run_es.visible = false;
        run_ne.visible = false;
        weapon_run_es.visible = false;
        weapon_run_ne.visible = false;
        run_es.frameRate = 10;
        run_ne.frameRate = 10;
        weapon_run_es.frameRate = 10;
        weapon_run_ne.frameRate = 10;
        
        esMovieClip[Global.Player_State.Run] = run_es;
        neMovieClip[Global.Player_State.Run] = run_ne;
        esWeaponMovieClip[Global.Player_State.Run] = weapon_run_es;
        neWeaponMovieClip[Global.Player_State.Run] = weapon_run_ne;

        this.moviClips[this.direction_up] = esMovieClip;
        this.moviClips[this.direction_down] = neMovieClip;

        this.weaponClips[this.direction_up] = esWeaponMovieClip;
        this.weaponClips[this.direction_down] = neWeaponMovieClip;

        this.curClip = idle_es;
        this.curWeaponClips = weapon_idle_es;

        this.updateDirectionAndState();

    }

    private createMovieClip(type:string, direction:string):egret.MovieClip
    {
        var txtr = RES.getRes("P10_" + type + "_" + direction + "_png");
        var data = RES.getRes("P10_" + type + "_" + direction + "_json");

        var factory = new egret.MovieClipDataFactory(data, txtr);
        var clip = new egret.MovieClip(factory.generateMovieClipData("P10_" + type + "_" + direction));
        clip.anchorOffsetX = 0.5;
        clip.anchorOffsetY = 0.5;
        clip.frameRate = 10;
        return clip;
    }

    private createFileClip(type:string, direction:string):egret.MovieClip
    {
        var txtr = RES.getRes("B301_M_" + type + "_" + direction + "_png");
        var data = RES.getRes("B301_M_" + type + "_" + direction + "_json");

        var factory = new egret.MovieClipDataFactory(data, txtr);
        var clip = new egret.MovieClip(factory.generateMovieClipData("B301_M_" + type + "_" + direction));
        clip.anchorOffsetX = 0.5;
        clip.anchorOffsetY = 0.5;
        clip.frameRate = 10;
        return clip;
    }

    private pathIndex:number;
    private path:Array<egret.Point>;

    public MoveByPath(_path: Array<egret.Point>):void
    {
        this.pathIndex = 0;
        this.path = _path;
        this.MovePathIndex();
    }

    private MovePathIndex():boolean
    {
        if(this.path.length > this.pathIndex)
        {
            this.GotoPosition(this.path[this.pathIndex]);
            this.pathIndex += 1;
            return true;
        }
        return false;       
    }

    private GotoPosition(positionTarget:egret.Point):void
    {
        let postion = new egret.Point(this.x, this.y);
        if(this._state == Global.Player_State.Idle || this._state == Global.Player_State.Run)
        {
            if(this.moveTween != null)
            {
                egret.Tween.removeTweens(this);
            }
            this.moveTween = egret.Tween.get(this);
            let speed = 0.1;
            let time = egret.Point.distance(positionTarget, new egret.Point(this.x, this.y)) / speed;
            this.moveTween.to({ "x": positionTarget.x, "y":positionTarget.y }, time);
            this.moveTween.call(this.moveEnd, this);
            if(positionTarget.x <= this.x)
            {
                if(positionTarget.y >= this.y)
                {
                    this.direction = Global.Direction.Down_Left;
                }
                else
                {
                    this.direction = Global.Direction.Up_Left;
                }
            }
            else
            {
                if(positionTarget.y >= this.y)
                {
                    this.direction = Global.Direction.Down_Right;
                }
                else
                {
                    this.direction = Global.Direction.Up_Right;
                }
            }
            this.state = Global.Player_State.Run;
        }
    }

    private moveEnd():void 
    {
        this.moveTween = null;
        if(!this.MovePathIndex())
        {
            this.state = Global.Player_State.Idle;
        }        
    }

    get direction(): Global.Direction
    {
        return this._direction;
    }

    set direction(value:Global.Direction)
    {
        if(this._direction != value)
        {
            this._direction = value;
            this.updateDirectionAndState();
        }
    }

    get state(): Global.Player_State
    {
        return this._state;
    }

    set state(value:Global.Player_State)
    {
        if(this._state != value)
        {
            this._state = value;
            this.updateDirectionAndState();
        }
    }

    private updateDirectionAndState(): void
    {
        this.curClip.stop();
        this.curClip.visible = false;

        this.curWeaponClips.stop();
        this.curWeaponClips.visible = false;

        if(this.direction == Global.Direction.Down_Left || this.direction == Global.Direction.Down_Right)
        {
            this.curClip = this.moviClips[this.direction_down][this._state];
            this.curWeaponClips = this.weaponClips[this.direction_down][this._state];
        }
        else
        {
            this.curClip = this.moviClips[this.direction_up][this._state];
            this.curWeaponClips = this.weaponClips[this.direction_up][this._state];
        }
        if(this.direction == Global.Direction.Down_Left || this.direction == Global.Direction.Up_Left)
        {
            this.curClip.scaleX = -1;
            this.curWeaponClips.scaleX = -1;
        }
        else
        {
            this.curClip.scaleX = 1;
            this.curWeaponClips.scaleX = 1;
        }
        this.curClip.visible = true;
        this.curWeaponClips.visible = true;
        this.curClip.play(-1);
        this.curWeaponClips.play(-1);
    }
}