var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TiledMap = (function () {
    function TiledMap() {
        this.mapPoints = null;
    }
    TiledMap.prototype.Init = function () {
        var text = RES.getRes("path_txt");
        var lines = text.split("\n");
        this.mapPoints = new Array();
        for (var i = 0; i < lines.length; i++) {
            var pointArr = new Array();
            var points = lines[i].split(",");
            for (var j = 0; j < points.length; j++) {
                if (points[j] != "\r") {
                    pointArr[j] = Number(points[j]);
                }
            }
            this.mapPoints[i] = pointArr;
        }
    };
    TiledMap.prototype.FindPath = function (from, to) {
        var finder = new Astar();
        var pathArr = finder.findPath(this.WordToLocal(from), this.WordToLocal(to), this.mapPoints);
        if (pathArr == null) {
            return null;
        }
        for (var i = 0; i < pathArr.length; i++) {
            pathArr[i] = this.LocalToWord(pathArr[i]);
        }
        pathArr[0] = from;
        pathArr[pathArr.length - 1] = to;
        return pathArr;
    };
    TiledMap.prototype.GetStartPoint = function () {
        return new egret.Point(4 * 32, 51 * 32);
    };
    TiledMap.prototype.WordToLocal = function (positon) {
        var ret = new egret.Point();
        ret.x = Math.ceil(positon.y / 32);
        ret.y = Math.ceil(positon.x / 32);
        return ret;
    };
    TiledMap.prototype.LocalToWord = function (positon) {
        var ret = new egret.Point();
        ret.x = positon.y * 32;
        ret.y = positon.x * 32;
        return ret;
    };
    return TiledMap;
}());
__reflect(TiledMap.prototype, "TiledMap");
//# sourceMappingURL=TiledMap.js.map