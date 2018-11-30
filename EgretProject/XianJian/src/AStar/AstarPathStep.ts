class AstarPathStep
{
        m_tilePos: egret.Point;
        m_gScore: number = 0;
        m_hScore: number = 0;
        m_parent: AstarPathStep;
        m_inOpen = false;
        m_inClose = false;
        
        public constructor(tilePos: egret.Point) 
        {
            this.m_tilePos = tilePos;
            this.m_parent = null;
        }
 
        /**
         * 返回这个点的f评分   Astar 权值 F=G+H 
         * */
        public fScore(): number 
        {
            return this.m_gScore + this.m_hScore;
        }
 
        /**
         * 是同一个AstarPathStep
         * */
        public isEqual(setp: AstarPathStep): boolean 
        {
            if(this.m_tilePos.x == setp.m_tilePos.x && this.m_tilePos.y == setp.m_tilePos.y) 
            {
                return true;
            }
            return false;
        }
 
        /**
         * 是同一个点
         * */
        public isEqualByPos(pos: egret.Point): boolean 
        {
            if(this.m_tilePos.x == pos.x && this.m_tilePos.y == pos.y) {
                return true;
            }
            return false;
        }
 
        /**
         * 设置为开放节点
         * */
        public setInOpen(flag) 
        {
            this.m_inOpen = flag;
        }
 
        /**
         * 设置为关闭节点
         * */
        public setInClose(flag) 
        {
            this.m_inClose = flag;
        }
    }