/**
 * Created by kelvinsun on 2016/3/7.
 */
'use strict';
let assert = require('assert'),
    GlobalEvent = require('../lib/index');

describe('global-event', function () {
    describe('#on() and emit()', function () {
        it('The registered function should be emitted', function (done) {
            let outterVariable = 0;
            GlobalEvent.on('test', function () {
                ++outterVariable;
            }).
                emit('test', function () {
                if (1 === outterVariable) {
                    done();
                }
            });
        });
    });

    describe('#on() with parameters', function () {
        it('The input parameter will match the arguments of listener', function (done) {
            let parameterNumber = 9;
            GlobalEvent.on('test2', function (arg1) {
                if (arg1 === parameterNumber) {
                    done();
                }
            }).
                emit('test2', undefined, parameterNumber);
        });
    });

    describe('#on() and off()', function () {
        it('The registered function should not be emitted', function (done) {
            let outterVariable = 0;
            GlobalEvent.on('test3', function () {
                ++outterVariable;
            }).
                off('test3').
                emit('test3', function () {
                if (0 === outterVariable) {
                    done();
                }
            });
        });
    });

    describe('#on() and off() with namespace', function () {
        it('The registered function with namespace should be removed.', function (done) {
            let outterVariable = 0;
            GlobalEvent.on('test4', function () {
                ++outterVariable;
            }, null, 'namespace').
                on('test4', function () {
                    ++outterVariable;
                    ++outterVariable;
                }).
                off('test4', 'namespace').
                emit('test4', function () {
                    if (2 === outterVariable) {
                        done();
                    } else {
                        done('error');
                    }
                });
        });
    });

    describe('#on() and clear()', function () {
        it('No listener will be called.', function (done) {
            let outterVariable = 0;
            GlobalEvent.on('test5', function () {
                ++outterVariable;
            }).
                on('test6', function () {
                    ++outterVariable;
                }).
                clear().
                emit('test5').
                emit('test6', function () {
                    if (0 === outterVariable) {
                        done();
                    } else {
                        done('error');
                    }
                });
        })
    });
});