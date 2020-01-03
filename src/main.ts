export type TEventCallBack = (...args: any[]) => any;

export interface DispatchAbleEvent<Enum> {
  type: Enum;
  args: any[];
  target: any;
}

export class EventDispatcher<Enum extends string> {
  protected __events: {
    [index: string]: TEventCallBack[];
  } = {} as any;

  find(type: Enum, callback: TEventCallBack) {
    return Array.isArray(this.__events[type]) ? this.__events[type].indexOf(callback) : -1;
  }

  has(type: Enum, callback: TEventCallBack) {
    return this.find(type, callback) !== -1;
  }

  on(type: Enum, callback: TEventCallBack) {
    const list = this.__events[type] = this.__events[type] ?? [];

    if (list.indexOf(callback) === -1) {
      list.push(callback);
    }
  }

  off(type: Enum, callback?: TEventCallBack) {
    if (!callback) {
      delete this.__events[type];
      return;
    }

    const index = this.find(type, callback);
    if (index !== -1) {
      this.__events[type].splice(index, 1);
    }
  }

  dispatch(type: Enum, ...args: any[]) {
    const eventsList = this.__events[type];
    if (Array.isArray(eventsList)) {
      const event: DispatchAbleEvent<Enum> = {
        type,
        args,
        target: this
      };

      const events = [...eventsList];
      for (let i = 0, length = events.length; i < length; i++) {
        events[i].call(this, event, ...args);
      }
    }
  }
}
