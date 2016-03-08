# global-event
[![Build Status](https://travis-ci.org/RequireSun/global-event.svg?branch=master)](https://travis-ci.org/RequireSun/global-event)

A simple event addon.

# How to use

All functions will return the global-event object for chained calls.
## on

Adds a listener function to the specified event.
+ __type__ 
   
  Name of the event to attach the listener to.
+ __callback__ 

  Method to be called when the event is emitted.
+ __[context]__ 

  Context of the callback function.
  If it doesn't provide, the function will be executed in the global scope.
+ __[namespace]__

  Namespace of the listener.
     
## emit

+ __type__

  Name of the event you want to add the listeners from.
+ __[callback]__

  The callback which will be called after all listeners run.
+ __[...arguments]__

  Arguments you want to pass to the listener.
     
## off

Removes listener functions of the specified event.
+ __type__ 

  Name of the event you want to remove the listeners from.
+ __[namespace]__ 

  Namespace of the listeners you want to remove. 
  If it doesn't provide, the function will remove all the listeners of the specified event.

## clear

Remove all the listener functions.

# Demo

```javascript
import { on, emit, off, clear } from 'global-event';

on(
    'logEvent', 
    (information) => console.log(information, 1), 
    null, 
    'demoSpace'
).
on(
    'logEvent', 
    (information) => console.log(information, 2),
    null,
    'anotherSpace'
);

emit('logEvent', 'The information');
// output 'The information 1'
// output 'The information 2'

off(
    'logEvent',
    'demoSpace'
).
emit(
    'logEvent',
    'Another information'
);
// output 'Another information 2'

off(
    'logEvent'
).
emit(
    'logEvent',
    'Third information'
);
// no output

clear();
// all listeners will be removed
```

# TODO

+ Add `once` function.

# Update

+ 2016-03-08

  Test Travis-CI.
+ 2016-03-07 _0.3.0_

  1. `emit` function now supports chained calls, and the second parameter of `emit` changed to `callback` which will be called after all event listeners be executed.
  2. Added `clear` function.
+ 2016-03-07 _0.2.1_

  Complete README.md.
+ 2016-03-05 _0.2.0_

  `on` and `off` functions now can call in chained.