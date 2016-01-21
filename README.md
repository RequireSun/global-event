# global-event
Global event.

# How to use

1. __on__

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
     
2. __emit__

   + __type__
   
   + __[...arguments]__
     the arguments
     
3. __off__

   Removes listener functions of the specified event.
   + __type__ 
   
     Name of the event you want to remove the listeners from.
   + __namespace__ 
   
     Namespace of the listeners you want to remove. 
     If it doesn't provide, the function will remove all the listeners of the specified event.


## Demo

```javascript
import { on, off, emit } from 'global-event';

on(
    'logEvent', 
    (information) => console.log(information), 
    null, 
    'demoSpace'
);

emit('logEvent', 'The information');
// output 'The information'
```
