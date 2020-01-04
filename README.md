# Event Dispatcher
Simple & tiny event dispatcher 

## Motivation
I want simple event dispatcher for my apps I created.

## API
EventDispatcher
* .on()
* .off()
* .dispatch()
* .find()
* .has()

## Example
```typescript
import {EventDispatcher} from 'core-event-dispatcher';

export enum SESSION_EVENT {
  SEND = 'send',
  CONNECT = 'connect'
}

export class ChatSession extends EventDispatcher<SESSION_EVENT> {
  send(message: string) {
    this.dispatch(SESSION_EVENT.SEND, message);
  };

  connect(name: string) {
    this.dispatch(SESSION_EVENT.CONNECT, name);
  }
}

export class ChatMediator extends ChatSession {
  constructor() {
    super();
    this.on(SESSION_EVENT.SEND, this.sendEvent);
    this.on(SESSION_EVENT.SEND, this.connectEvent);
  }

  sendEvent = (event: DispatchEvent<SESSION_EVENT>, message: string) => {
    console.log(message);  
  }

  connectEvent = (event: DispatchEvent<SESSION_EVENT>, name: string) => {
    console.log(name);  
  } 
}
```