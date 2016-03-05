# global-event
Global event.

# How to use

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
+ __[...arguments]__

  the arguments
     
## off

Removes listener functions of the specified event.
+ __type__ 

  Name of the event you want to remove the listeners from.
+ __namespace__ 

  Namespace of the listeners you want to remove. 
  If it doesn't provide, the function will remove all the listeners of the specified event.


# Demo

```javascript
import { on, off, emit } from 'global-event';

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
    'logEvent'
    'demoSpace'
).
emit(
    'logEvent',
    'Another information'
);
// output 'Another information 2'
```

# Update

+ 2016-03-05

  `on` and `off` functions now can call in chained.