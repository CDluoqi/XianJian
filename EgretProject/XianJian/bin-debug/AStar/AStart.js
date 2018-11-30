var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Astar = (function () {
    function Astar() {
        /**
         * 关闭节点列表
         * */
        this.m_closeList = new HashMap(); //<Map>
    }
    Object.defineProperty(Astar, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new Astar();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Astar.prototype.findPath = function (startPos, endPos, tileMap) {
        this.tileMap = tileMap; //地图
        var isFind = false;
        var starTime = egret.getTimer(); //开始寻路的时间
        if (egret.Point.distance(startPos, endPos) < 0.5) {
            return null;
        }
        if (!this.isWalkable(endPos)) {
            return null;
        }
        if (!this.m_openList) {
            this.m_openList = new Array();
        }
        this.m_closeList.clear();
        var endStep = new AstarPathStep(endPos);
        var startStep = new AstarPathStep(startPos);
        startStep.m_hScore = this.getHValue(startStep, endStep);
        this.insertAndSort(startStep);
        var curStep;
        do {
            curStep = this.m_openList.shift();
            curStep.setInClose(true);
            curStep.setInOpen(false);
            this.m_closeList.put(curStep.m_tilePos.x + "_" + curStep.m_tilePos.y, true);
            if (curStep.isEqualByPos(endPos)) {
                isFind = true;
                break;
            }
            var arundNodes = this.getAroundsNode(curStep.m_tilePos);
            for (var i = 0; i < arundNodes.length; i++) {
                var nextStep = new AstarPathStep(arundNodes[i]);
                nextStep.m_gScore = this.getGValue(curStep, nextStep);
                nextStep.m_hScore = this.getHValue(endStep, nextStep);
                nextStep.m_parent = curStep;
                this.insertAndSort(nextStep);
            }
        } while (this.m_openList.length > 0);
        if (isFind) {
            var path = this.createPath(curStep);
            this.m_openList.length = 0;
            this.m_closeList.clear();
            return path;
        }
        else {
            this.m_openList.length = 0;
            this.m_closeList.clear();
            return null;
        }
    };
    Astar.prototype.createPath = function (step) {
        var path = new Array();
        do {
            if (step.m_parent != null) {
                var curPos = step.m_tilePos;
                path.unshift(curPos);
            }
            step = step.m_parent;
        } while (step != null);
        return path;
    };
    Astar.prototype.getGValue = function (curStep, nextStep) {
        var extaScore = 0;
        var curPos = curStep.m_tilePos;
        var nextPos = nextStep.m_tilePos;
        var G = 0;
        if (curPos.y == nextPos.y) {
            G = curStep.m_gScore + Astar.COST_HORIZONTAL;
        }
        else if (curPos.x == nextPos.x) {
            G = curStep.m_gScore + Astar.COST_VERTICAL;
        }
        else {
            G = curStep.m_gScore + Astar.COST_DIAGONAL;
        }
        return G;
    };
    //获取周围的节点
    Astar.prototype.getAroundsNode = function (tpt) {
        var aroundNodes = new Array();
        var p = new egret.Point();
        //上
        p = new egret.Point(tpt.x, tpt.y - 1);
        if (this.isWalkable(p) && this.isInClosed(p) == false) {
            aroundNodes.push(p);
        }
        //下
        p = new egret.Point(tpt.x, tpt.y + 1);
        if (this.isWalkable(p) && this.isInClosed(p) == false) {
            aroundNodes.push(p);
        }
        //左
        p = new egret.Point(tpt.x - 1, tpt.y);
        if (this.isWalkable(p) && this.isInClosed(p) == false) {
            aroundNodes.push(p);
        }
        //右
        p = new egret.Point(tpt.x + 1, tpt.y);
        if (this.isWalkable(p) && this.isInClosed(p) == false) {
            aroundNodes.push(p);
        }
        //左上
        p = new egret.Point(tpt.x - 1, tpt.y - 1);
        if (this.isWalkable(p) && this.isInClosed(p) == false) {
            aroundNodes.push(p);
        }
        //左下
        p = new egret.Point(tpt.x - 1, tpt.y + 1);
        if (this.isWalkable(p) && this.isInClosed(p) == false) {
            aroundNodes.push(p);
        }
        //右上
        p = new egret.Point(tpt.x + 1, tpt.y - 1);
        if (this.isWalkable(p) && this.isInClosed(p) == false) {
            aroundNodes.push(p);
        }
        //右下
        p = new egret.Point(tpt.x + 1, tpt.y + 1);
        if (this.isWalkable(p) && this.isInClosed(p) == false) {
            aroundNodes.push(p);
        }
        return aroundNodes;
    };
    Astar.prototype.isInClosed = function (tpt) {
        if (this.m_closeList.get(tpt.x + "_" + tpt.y)) {
            return true;
        }
        else {
            return false;
        }
    };
    Astar.prototype.isWalkable = function (tpt) {
        if (this.tileMap.length > tpt.x && tpt.x >= 0) {
            if (this.tileMap[tpt.x].length > tpt.y && tpt.y >= 0) {
                var po = this.tileMap[tpt.x][tpt.y];
                if (this.tileMap[tpt.x][tpt.y] > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    Astar.prototype.getHValue = function (endStep, nextStep) {
        return egret.Point.distance(endStep.m_tilePos, nextStep.m_tilePos);
    };
    Astar.prototype.insertAndSort = function (step) {
        step.setInOpen(true);
        var score = step.fScore();
        var inserted = false;
        for (var i = 0; i < this.m_openList.length; i++) {
            if (this.m_openList[i].isEqual(step)) {
                if (score > this.m_openList[i].fScore()) {
                    return;
                }
                else {
                    this.m_openList.splice(i, 1);
                    break;
                }
            }
        }
        for (var i = 0; i < this.m_openList.length; i++) {
            if (score <= this.m_openList[i].fScore()) {
                this.m_openList.splice(i, 0, step);
                return;
            }
        }
        this.m_openList.push(step);
    };
    /**
     * 横向移动一格的评分
     * */
    Astar.COST_HORIZONTAL = 1; //根据实际的TileMap定义值
    /**
     * 竖向移动一格的路劲评分
     * */
    Astar.COST_VERTICAL = 1; //根据实际的TileMap定义值
    /**
     * 斜向移动一格的路劲评分
     * */
    Astar.COST_DIAGONAL = 1.414; //根据实际的TileMap定义值
    return Astar;
}());
__reflect(Astar.prototype, "Astar");
//# sourceMappingURL=AStart.js.map