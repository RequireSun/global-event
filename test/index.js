/**
 * Created by kelvinsun on 2016/3/7.
 */
'use strict';
const assert      = require('assert');
const _           = require('lodash');
const GlobalEvent = require('../lib/index');

describe('global-event', function () {
    describe('#on() and emit()', function () {
        it('The registered function should be emitted', function (done) {
            var outterVariable = 0;
            GlobalEvent.on('test', function () {
                ++outterVariable;
            }).on('test', { a: 1 }).emit('test', function (a, b) {
                assert.equal(outterVariable, 1);
                assert.equal(_.isEqual({ a: 1 }, b), true);
                done();
            });
        });
    });

    describe('#on() with parameters', function () {
        it('The input parameter will match the arguments of listener', function (done) {
            var parameterNumber = 9;
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
            var outterVariable = 0;
            GlobalEvent.on('test3', function () {
                ++outterVariable;
            }).off(
                'test4', 'abc'
            ).emit('test3', function () {
                assert.equal(outterVariable, 1);
            }).off(
                'test3'
            ).emit('test3', function () {
                assert.equal(outterVariable, 1);
                done();
            });
        });
    });

    describe('#on() and off() with namespace', function () {
        it('The registered function with namespace should be removed.', function (done) {
            var outterVariable = 0;
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
            var outterVariable = 0;
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

    describe('#once()', function () {
        it('The registered function should be emitted once', function () {
            var outterVariable = 0;
            GlobalEvent.once('test', function (a) {
                outterVariable += a;
            }).once(
                'test', { a: 1 }
            ).emit('test', function (a, b) {
                assert.equal(outterVariable, 2);
                assert.equal(_.isEqual({ a: 1 }, b));
            }, 2).emit('test', function () {
                assert.equal(outterVariable, 2);
            }, 2);
        });

        it('The registered function should be removed by off', function () {
            var outterVariable = 0;
            GlobalEvent.once('test', function () {
                ++outterVariable;
            }, {}, 'abc').off(
                'test', 'abc'
            ).emit('test', function () {
                assert.equal(outterVariable, 0);
            });
        });
    });
});