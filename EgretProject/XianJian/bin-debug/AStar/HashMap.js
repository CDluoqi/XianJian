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
var HashMap = (function (_super) {
    __extends(HashMap, _super);
    function HashMap() {
        return _super.call(this) || this;
    }
    /**
     * 加入数据
     * @param key 键
     * @param value 值
     */
    HashMap.prototype.put = function (key, value) {
        this[key] = value;
    };
    /**
     * 获得数据
     * @param key 键
     */
    HashMap.prototype.get = function (key) {
        return this[key];
    };
    /**
     * 移除数据
     * @param key 键
     */
    HashMap.prototype.remove = function (key) {
        var value = this[key];
        if (value) {
            this[key] = null; ////////////////////chengongwei add at 2016-08-15
            delete this[key]; //then undefined
        }
        return value; //should outter be = null, for clear memory
    };
    /**
     * 是否存在
     * @param key 键
     */
    HashMap.prototype.contains = function (key) {
        return this[key] != null;
    };
    /**
     * 获得所有键值
     */
    HashMap.prototype.keys = function () {
        var keys = Object.keys(this);
        var index = keys.indexOf("$hashCode"); //4.0版本更新将"_hashCode"更改为"$hashCode"，Egret  3.23以前版本用“_hashCode”；
        if (index > -1) {
            keys.splice(index, 1);
        }
        return keys;
    };
    /**
     * 清空
     */
    HashMap.prototype.clear = function () {
        var keys = this.keys();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var value = this.remove(keys[i]);
            value = null; ////////////////////
        }
    };
    return HashMap;
}(egret.HashObject));
__reflect(HashMap.prototype, "HashMap");
//# sourceMappingURL=HashMap.js.map