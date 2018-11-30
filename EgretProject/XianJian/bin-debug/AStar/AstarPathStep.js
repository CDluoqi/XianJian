var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AstarPathStep = (function () {
    function AstarPathStep(tilePos) {
        this.m_gScore = 0;
        this.m_hScore = 0;
        this.m_inOpen = false;
        this.m_inClose = false;
        this.m_tilePos = tilePos;
        this.m_parent = null;
    }
    /**
     * 返回这个点的f评分   Astar 权值 F=G+H
     * */
    AstarPathStep.prototype.fScore = function () {
        return this.m_gScore + this.m_hScore;
    };
    /**
     * 是同一个AstarPathStep
     * */
    AstarPathStep.prototype.isEqual = function (setp) {
        if (this.m_tilePos.x == setp.m_tilePos.x && this.m_tilePos.y == setp.m_tilePos.y) {
            return true;
        }
        return false;
    };
    /**
     * 是同一个点
     * */
    AstarPathStep.prototype.isEqualByPos = function (pos) {
        if (this.m_tilePos.x == pos.x && this.m_tilePos.y == pos.y) {
            return true;
        }
        return false;
    };
    /**
     * 设置为开放节点
     * */
    AstarPathStep.prototype.setInOpen = function (flag) {
        this.m_inOpen = flag;
    };
    /**
     * 设置为关闭节点
     * */
    AstarPathStep.prototype.setInClose = function (flag) {
        this.m_inClose = flag;
    };
    return AstarPathStep;
}());
__reflect(AstarPathStep.prototype, "AstarPathStep");
//# sourceMappingURL=AstarPathStep.js.map