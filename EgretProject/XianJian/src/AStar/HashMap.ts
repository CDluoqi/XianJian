class HashMap extends egret.HashObject {
 
        constructor() {
            super();
        }
 
        /**
         * 加入数据
         * @param key 键
         * @param value 值
         */
        put(key:any, value:any):void {
            this[key] = value;
        }
 
        /**
         * 获得数据
         * @param key 键
         */
        get(key:any):any {
            return this[key];
        }
 
        /**
         * 移除数据
         * @param key 键
         */
        remove(key:any):any {
            var value = this[key];
            if (value) {
                this[key] = null;////////////////////chengongwei add at 2016-08-15
                delete this[key];//then undefined
            }
            return value;//should outter be = null, for clear memory
        }
 
        /**
         * 是否存在
         * @param key 键
         */
        contains(key:any):boolean {
            return this[key] != null;
        }
 
        /**
         * 获得所有键值
         */
        keys():string[] {
            var keys = Object.keys(this);
            var index = keys.indexOf("$hashCode");//4.0版本更新将"_hashCode"更改为"$hashCode"，Egret  3.23以前版本用“_hashCode”；
            if (index > -1) {
                keys.splice(index, 1)
            }
            return keys;
        }
 
        /**
         * 清空
         */
        clear():void {
            var keys = this.keys();
            var len = keys.length;
            for (var i = 0; i < len; i++) {
                let value = this.remove(keys[i]);
                value = null;////////////////////
            }
        }
    }