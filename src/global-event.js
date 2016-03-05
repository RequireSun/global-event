/**
 * Created by kelvinsun on 2015/10/23.
 */
'use strict';

// 事件队列
let _events = {};
/**
 * 事件绑定
 * @param type      事件名
 * @param callback  事件处理函数
 * @param context   处理时的上下文
 * @param namespace 命名空间, 防止误删用
 */
export function on (type, callback, context = null, namespace = Date.now()) {
    '[object Array]' !== Object.prototype.toString.call(_events[type]) && (_events[type] = []);
    _events[type].push({
        namespace: namespace,
        fn: callback,
        context: context
    });
    return this;
}
/**
 * 事件解绑
 * @param type      事件名
 * @param namespace 命名空间, 防止误删用
 */
// TODO: 添加删除所有匿名事件功能
export function off (type, namespace) {
    if (namespace) {
        let e = _events[type] || [];
        for (let i = e.length - 1; -1 < i; --i) {
            if (namespace === e[i]['namespace']) {
                e.splice(i, 1);
            }
        }
    } else {
        delete _events[type];
    }
    return this;
}
/**
 * 事件触发
 * @param type      事件名
 * @param args   传递给处理函数的参数
 * @returns {Array} 存有每个事件返回值的数组
 */
export function emit (type, ...args) {
    let e = _events[type] || [],
        returnValues = [];
    for (let i = 0, l = e.length; i < l; ++i) {
        let callback = e[i];
        '[object Function]' === Object.prototype.toString.call(callback.fn) ? returnValues.push(callback.fn.apply(callback.context, args)) : returnValues.push(callback.fn);
    }
    return returnValues;
}