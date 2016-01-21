# global-event
Global event.

# How to use

1. __on__
   Adds a listener function to the specified event.
   + __type__ 
   
     Name of the event to attach the listener to.
   + __callback__ 
   
     Method to be called when the event is emitted.
   + __context__ 
   + __namespace__ 
2. __off__
   Removes listener functions of the specified event.
   + __type__ 
   
     Name of the event you want to remove the listeners from.
   + __namespace__ 
   
     Namespace of the listeners you want to remove. If it doesn't provide, the function will remove all the listeners of the specified event.

## Demo

```javascript
import { on, off, emit } from 'global-event';

on(
    'logEvent', 
    (information) => console.log(information), 
    null, 
    'demoSpace'
);
```
