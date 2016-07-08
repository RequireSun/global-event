/**
 * Created by kelvinsun on 2015/10/23.
 */
'use strict';

// 事件队列
let _events = {};
/* istanbul ignore next */
const ToStringObject   = (obj, ...args) => Object.prototype.toString.apply(obj, args);
// 暂时没用
//const ToStringFunction = (obj, ...args) => Function.prototype.toString.apply(obj, args);
/**
 * 事件绑定
 * @param type          事件名
 * @param callback      事件处理函数
 * @param context       处理时的上下文
 * @param namespace     命名空间, 防止误删用
 * @returns GlobalEvent 方便链式调用
 */
export function on (type, callback, context = null, namespace = Date.now()) {
    '[object Array]' !== ToStringObject(_events[type]) && (_events[type] = []);
    _events[type].push({
        namespace,
        fn: callback,
        context,
    });
    return exports;
}
export function once (type, callback, context = null, namespace = Date.now()) {
    '[object Array]' !== ToStringObject(_events[type]) && (_events[type] = []);
    const wrappedCallback = function (...args) {
        const returnValue = '[object Function]' === ToStringObject(callback) ? callback.apply(this, args) : callback;
        off(wrappedCallback);
        return returnValue;
    };
    _events[type].push({
        namespace,
        fn: wrappedCallback,
        context,
    });
    return exports;
}
/**
 * 事件触发
 * @param type          事件名
 * @param callback      回调函数, 参数为每个事件的返回值的集合
 * @param args          传递给处理函数的参数
 * @returns GlobalEvent 方便链式调用
 */
export function emit (type, callback, ...args) {
    let e = _events[type] || [],
        returnValues = [],
        l = e.length;
    for (let i = 0; i < l; e.length === l ? ++i : (l = e.length)) {
        let callback = e[i];
        '[object Function]' === ToStringObject(callback.fn) ? returnValues.push(callback.fn.apply(callback.context, args)) : returnValues.push(callback.fn);
    }
    callback && callback(...returnValues);
    return exports;
}
/**
 * 事件解绑
 * @param type          事件名
 * @param namespace     命名空间, 防止误删用
 * @returns GlobalEvent 方便链式调用
 */
// TODO: 添加删除所有匿名事件功能
export function off (type, namespace) {
    if ('[object Function]' === ToStringObject(type)) {
        for (let key in _events) {
            const item = _events[key];
            for (let i = item.length - 1; -1 < i; --i) {
                if (type === item[i]['fn']) {
                    item.splice(i, 1);
                }
            }
        }
    } else if (namespace) {
        const e = _events[type] || [];
        for (let i = e.length - 1; -1 < i; --i) {
            if (namespace === e[i]['namespace']) {
                e.splice(i, 1);
            }
        }
    } else {
        delete _events[type];
    }
    return exports;
}
/**
 * !危险! 清空全部事件
 * @returns GlobalEvent 方便链式调用
 */
export function clear () {
    _events = {};
    return exports;
}