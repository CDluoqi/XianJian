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
var Global;
(function (Global) {
    var Direction;
    (function (Direction) {
        Direction[Direction["Up_Left"] = 0] = "Up_Left";
        Direction[Direction["Up_Right"] = 1] = "Up_Right";
        Direction[Direction["Down_Left"] = 2] = "Down_Left";
        Direction[Direction["Down_Right"] = 3] = "Down_Right";
    })(Direction = Global.Direction || (Global.Direction = {}));
    var Player_State;
    (function (Player_State) {
        Player_State[Player_State["Idle"] = 0] = "Idle";
        Player_State[Player_State["Run"] = 1] = "Run";
        Player_State[Player_State["Use_Skill"] = 2] = "Use_Skill";
    })(Player_State = Global.Player_State || (Global.Player_State = {}));
})(Global || (Global = {}));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.moviClips = {};
        _this.curClip = null;
        _this.moveTween = null;
        _this.direction_down = "es";
        _this.direction_up = "ne";
        _this._direction = Global.Direction.Down_Left;
        _this._state = Global.Player_State.Idle;
        return _this;
    }
    Player.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var esMovieClip = new Array();
        var neMovieClip = new Array();
        var idle_es = this.createMovieClip("idle", this.direction_up);
        var idle_ne = this.createMovieClip("idle", this.direction_down);
        this.addChild(idle_es);
        this.addChild(idle_ne);
        idle_es.visible = false;
        idle_es.frameRate = 10;
        idle_ne.visible = false;
        idle_ne.frameRate = 10;
        esMovieClip[Global.Player_State.Idle] = idle_es;
        neMovieClip[Global.Player_State.Idle] = idle_ne;
        var run_es = this.createMovieClip("run", this.direction_up);
        var run_ne = this.createMovieClip("run", this.direction_down);
        this.addChild(run_es);
        this.addChild(run_ne);
        run_es.visible = false;
        run_ne.visible = false;
        run_es.frameRate = 10;
        run_ne.frameRate = 10;
        esMovieClip[Global.Player_State.Run] = run_es;
        neMovieClip[Global.Player_State.Run] = run_ne;
        this.moviClips[this.direction_up] = esMovieClip;
        this.moviClips[this.direction_down] = neMovieClip;
        this.curClip = idle_es;
        this.updateDirectionAndState();
    };
    Player.prototype.createMovieClip = function (type, direction) {
        var txtr = RES.getRes("P10_" + type + "_" + direction + "_png");
        var data = RES.getRes("P10_" + type + "_" + direction + "_json");
        var factory = new egret.MovieClipDataFactory(data, txtr);
        var clip = new egret.MovieClip(factory.generateMovieClipData("P10_" + type + "_" + direction));
        clip.anchorOffsetX = 0.5;
        clip.anchorOffsetY = 0.5;
        clip.frameRate = 10;
        return clip;
    };
    Player.prototype.MoveByPath = function (_path) {
        this.pathIndex = 0;
        this.path = _path;
        this.MovePathIndex();
    };
    Player.prototype.MovePathIndex = function () {
        if (this.path.length > this.pathIndex) {
            this.GotoPosition(this.path[this.pathIndex]);
            this.pathIndex += 1;
            return true;
        }
        return false;
    };
    Player.prototype.GotoPosition = function (positionTarget) {
        var postion = new egret.Point(this.x, this.y);
        if (this._state == Global.Player_State.Idle || this._state == Global.Player_State.Run) {
            if (this.moveTween != null) {
                egret.Tween.removeTweens(this);
            }
            this.moveTween = egret.Tween.get(this);
            var speed = 0.1;
            var time = egret.Point.distance(positionTarget, new egret.Point(this.x, this.y)) / speed;
            this.moveTween.to({ "x": positionTarget.x, "y": positionTarget.y }, time);
            this.moveTween.call(this.moveEnd, this);
            if (positionTarget.x <= this.x) {
                if (positionTarget.y >= this.y) {
                    this.direction = Global.Direction.Down_Left;
                }
                else {
                    this.direction = Global.Direction.Up_Left;
                }
            }
            else {
                if (positionTarget.y >= this.y) {
                    this.direction = Global.Direction.Down_Right;
                }
                else {
                    this.direction = Global.Direction.Up_Right;
                }
            }
            this.state = Global.Player_State.Run;
        }
    };
    Player.prototype.moveEnd = function () {
        this.moveTween = null;
        if (!this.MovePathIndex()) {
            this.state = Global.Player_State.Idle;
        }
    };
    Object.defineProperty(Player.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            if (this._direction != value) {
                this._direction = value;
                this.updateDirectionAndState();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            if (this._state != value) {
                this._state = value;
                this.updateDirectionAndState();
            }
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.updateDirectionAndState = function () {
        this.curClip.stop();
        this.curClip.visible = false;
        if (this.direction == Global.Direction.Down_Left || this.direction == Global.Direction.Down_Right) {
            this.curClip = this.moviClips[this.direction_down][this._state];
        }
        else {
            this.curClip = this.moviClips[this.direction_up][this._state];
        }
        if (this.direction == Global.Direction.Down_Left || this.direction == Global.Direction.Up_Left) {
            this.curClip.scaleX = -1;
        }
        else {
            this.curClip.scaleX = 1;
        }
        this.curClip.visible = true;
        this.curClip.play(-1);
    };
    return Player;
}(eui.Group));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map