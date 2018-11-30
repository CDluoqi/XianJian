class TiledMap
{
    private mapPoints:Array<Array<Number>> = null;

    public  Init():void
    {
        let text:string = RES.getRes("path_txt");
        let lines:string[] = text.split("\n");
        this.mapPoints = new Array<Array<Number>>();
        for(let i =0; i < lines.length; i++)
        {
            let pointArr = new Array<Number>();
            let points:string[] = lines[i].split(",");
            for(let j = 0; j < points.length; j++)
            {
                if(points[j] != "\r")
                {
                    pointArr[j] = Number(points[j]);
                }                
            }
            this.mapPoints[i] = pointArr;
        }
    }

    public FindPath(from:egret.Point, to:egret.Point):Array<egret.Point>
    {
        let finder = new Astar();
        let pathArr = finder.findPath(this.WordToLocal(from), this.WordToLocal(to), this.mapPoints);
        if(pathArr == null)
        {
            return null;
        }
        for(let i = 0; i< pathArr.length; i++)
        {
            pathArr[i] = this.LocalToWord(pathArr[i]);
        }
        pathArr[0] = from;
        pathArr[pathArr.length - 1] = to;
        return pathArr;
    }

    public GetStartPoint():egret.Point
    {
        return new egret.Point(4 * 32,51 * 32);
    }

    private WordToLocal(positon: egret.Point): egret.Point
    {
        let ret = new egret.Point();
        ret.x = Math.ceil(positon.y / 32);
        ret.y = Math.ceil(positon.x / 32);
        return ret;
    }

    private LocalToWord(positon: egret.Point): egret.Point
    {
        let ret = new egret.Point();
        ret.x = positon.y * 32;
        ret.y = positon.x * 32;
        return  ret;
    }

}