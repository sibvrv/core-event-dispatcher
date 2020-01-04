export type EventListener = (...args: any[]) => any;

export interface DispatchEvent<Enum = string> {
  type: Enum;
  args: any[];
  target: any;
}

/**
 * Event Dispatcher
 */
export class EventDispatcher<Enum extends string = string> {
  protected __events: {
    [index: string]: EventListener[];
  } = {} as any;

  /**
   * Find Event Listener
   * @param type
   * @param callback
   */
  find(type: Enum, callback: EventListener) {
    return Array.isArray(this.__events[type]) ? this.__events[type].indexOf(callback) : -1;
  }

  /**
   * Has Event Listener
   * @param type
   * @param callback
   */
  has(type: Enum, callback: EventListener) {
    return this.find(type, callback) !== -1;
  }

  /**
   * Add Event Listener
   * Add a listener for an event type.
   * @param type A case-sensitive string representing the event type to listen for
   * @param callback The function which receives a notification when an event of the specified type occurs.
   */
  on(type: Enum, callback: EventListener) {
    if (typeof callback !== 'function') {
      throw new Error('Listener must be a function');
    }
    const list = this.__events[type] = this.__events[type] ?? [];

    if (list.indexOf(callback) === -1) {
      list.push(callback);
    }

    return () => {
      this.off(type, callback);
    };
  }

  /**
   * Remove Event Listener
   * The EventDispatcher.off() method removes from the __events an event listener previously registered with EventDispatcher.on()
   * The event listener to be removed is identified using a combination of the event type, the event listener function itself
   * @param type
   * @param callback
   */
  off(type: Enum, callback?: EventListener) {
    if (!callback) {
      delete this.__events[type];
      return;
    }

    const index = this.find(type, callback);
    if (index !== -1) {
      if (this.__events[type].length === 1) {
        delete this.__events[type];
      } else {
        this.__events[type].splice(index, 1);
      }
    }
  }

  /**
   * Dispatch Event
   * @param type
   * @param args
   */
  dispatch(type: Enum, ...args: any[]) {
    const eventsList = this.__events[type];
    if (Array.isArray(eventsList)) {
      const event: DispatchEvent<Enum> = {
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
