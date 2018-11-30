'use strict';
class Astar 
{       
        private static _instance: Astar;
        static get instance(): Astar 
        {
            if(!this._instance) 
            {
                this._instance = new Astar();
            }
            return this._instance;
        }
 
        /**
         * 开放节点列表
         * */
        m_openList: Array<AstarPathStep>;/* = new Array<AstarPathStep>()*/
 
        /**
         * 关闭节点列表
         * */
        m_closeList: HashMap = new HashMap();  //<Map>
 
        /**
         * 横向移动一格的评分
         * */
        public static COST_HORIZONTAL = 1;    //根据实际的TileMap定义值
 
        /**
         * 竖向移动一格的路劲评分
         * */
        public static COST_VERTICAL = 1;	  //根据实际的TileMap定义值
 
        /**
         * 斜向移动一格的路劲评分
         * */
        public static COST_DIAGONAL = 1.414;     //根据实际的TileMap定义值
        
        public constructor() 
        {
 
        }
        
        public tileMap: Array<Array<Number>>;
        
        public findPath(startPos: egret.Point,endPos: egret.Point,tileMap: Array<Array<Number>>) 
        {            
            this.tileMap = tileMap;//地图
            
            var isFind = false;
 
            var starTime = egret.getTimer();//开始寻路的时间
 
            if(egret.Point.distance(startPos,endPos) < 0.5) 
            {
                return null;
            }
 
            if(!this.isWalkable(endPos))
            {
                return null;
            }

            if (!this.m_openList)
            {
                this.m_openList = new Array<AstarPathStep>();
            }
                
            this.m_closeList.clear();
 
            var endStep = new AstarPathStep(endPos);
            var startStep = new AstarPathStep(startPos);
            
            startStep.m_hScore = this.getHValue(startStep,endStep);
            this.insertAndSort(startStep);
 
            var curStep: AstarPathStep;
            do 
            { 
                curStep = this.m_openList.shift();
                curStep.setInClose(true);
                curStep.setInOpen(false);
                this.m_closeList.put(curStep.m_tilePos.x + "_" + curStep.m_tilePos.y,true);
 
                if(curStep.isEqualByPos(endPos)) 
                {
                    isFind = true;
                    break;
                }
 
                var arundNodes = this.getAroundsNode(curStep.m_tilePos);
                for(var i = 0;i < arundNodes.length;i++) 
                {
                    var nextStep = new AstarPathStep(arundNodes[i]);
                    nextStep.m_gScore = this.getGValue(curStep,nextStep);
                    nextStep.m_hScore = this.getHValue(endStep,nextStep);
                    nextStep.m_parent = curStep;
                    this.insertAndSort(nextStep);
                }                
            }
            while(this.m_openList.length > 0);
 
            if(isFind) 
            {
                var path = this.createPath(curStep);
                this.m_openList.length = 0;
                this.m_closeList.clear();
                return path;
            } 
            else 
            {
                this.m_openList.length = 0;
                this.m_closeList.clear();
                return null;
            }
        }
 
        public createPath(step: AstarPathStep) 
        {
            var path: Array<egret.Point> = new Array<egret.Point>();
            do
            {
                if(step.m_parent != null)
                {
                    var curPos: egret.Point = step.m_tilePos;
                    path.unshift(curPos);
                }
                step = step.m_parent;
            } 
            while(step != null) 
            return path;
        }
 
        public getGValue(curStep: AstarPathStep,nextStep: AstarPathStep): number 
        {
            var extaScore = 0;
            var curPos = curStep.m_tilePos;
            var nextPos = nextStep.m_tilePos;
            var G = 0;
            if(curPos.y == nextPos.y) 
            {
                G = curStep.m_gScore + Astar.COST_HORIZONTAL;
            }
            else if(curPos.x == nextPos.x) 
            {
                G = curStep.m_gScore + Astar.COST_VERTICAL;
            } 
            else 
            {
                G = curStep.m_gScore + Astar.COST_DIAGONAL;
            }
            return G;
        }

        //获取周围的节点
        public getAroundsNode(tpt: egret.Point): Array<egret.Point> 
        {
            var aroundNodes: Array<egret.Point> = new Array();
            var p: egret.Point = new egret.Point();
            //上
            p = new egret.Point(tpt.x, tpt.y - 1);
            if(this.isWalkable(p) && this.isInClosed(p) == false)
            {
                aroundNodes.push(p);
            }
            //下
            p = new egret.Point(tpt.x, tpt.y + 1);
            if(this.isWalkable(p) && this.isInClosed(p) == false) 
            {
                aroundNodes.push(p);
            }
            //左
            p = new egret.Point(tpt.x - 1, tpt.y);
            if(this.isWalkable(p) && this.isInClosed(p) == false) 
            {
                aroundNodes.push(p);
            }
            //右
            p = new egret.Point(tpt.x + 1, tpt.y);
            if(this.isWalkable(p) && this.isInClosed(p) == false) 
            {
                aroundNodes.push(p);
            }
            //左上
            p = new egret.Point(tpt.x - 1, tpt.y - 1);
            if(this.isWalkable(p) && this.isInClosed(p) == false) 
            {
                aroundNodes.push(p);
            }
            //左下
            p = new egret.Point(tpt.x - 1, tpt.y + 1);
            if(this.isWalkable(p) && this.isInClosed(p) == false) 
            {
                aroundNodes.push(p);
            }
            //右上
            p = new egret.Point(tpt.x + 1, tpt.y - 1);
            if(this.isWalkable(p) && this.isInClosed(p) == false) 
            {
                aroundNodes.push(p);
            }            
            //右下
            p = new egret.Point(tpt.x + 1, tpt.y + 1);
            if(this.isWalkable(p) && this.isInClosed(p) == false) 
            {
                aroundNodes.push(p);
            }
            return aroundNodes;
        }
 
        public isInClosed(tpt: egret.Point): boolean 
        {
            if(this.m_closeList.get(tpt.x + "_" + tpt.y)) 
            {
                return true;
            } 
            else 
            {
                return false;
            }
        }
 
        public isWalkable(tpt: egret.Point): boolean 
        {
            if(this.tileMap.length > tpt.x && tpt.x >= 0)
            {
                if(this.tileMap[tpt.x].length > tpt.y && tpt.y >= 0)
                {
                    let po = this.tileMap[tpt.x][tpt.y];
                    if(this.tileMap[tpt.x][tpt.y] > 0)
                    {
                        return true;
                    }
                }
            }
            
            return false;
        }
 
        public getHValue(endStep: AstarPathStep,nextStep: AstarPathStep): number 
        {
            return egret.Point.distance(endStep.m_tilePos, nextStep.m_tilePos);

        }
 
        private insertAndSort(step: AstarPathStep) 
        {
            step.setInOpen(true);
            var score = step.fScore();
            let inserted = false;
            for(var i = 0; i < this.m_openList.length; i++) 
            {
                if(this.m_openList[i].isEqual(step))
                {
                    if(score > this.m_openList[i].fScore())
                    {
                        return;
                    }  
                    else
                    {
                        this.m_openList.splice(i,1);
                        break;
                    }
                }                
            }
            for(var i = 0; i < this.m_openList.length; i++) 
            {
                    if(score <= this.m_openList[i].fScore())
                    {
                        this.m_openList.splice(i,0, step);
                        return;
                    }
            }
            this.m_openList.push(step);
        }
        
    }