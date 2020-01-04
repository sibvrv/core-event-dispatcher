export declare type EventListener = (...args: any[]) => any;
export interface DispatchEvent<Enum = string> {
    type: Enum;
    args: any[];
    target: any;
}
/**
 * Event Dispatcher
 */
export declare class EventDispatcher<Enum extends string = string> {
    protected __events: {
        [index: string]: EventListener[];
    };
    /**
     * Find Event Listener
     * @param type
     * @param callback
     */
    find(type: Enum, callback: EventListener): number;
    /**
     * Has Event Listener
     * @param type
     * @param callback
     */
    has(type: Enum, callback: EventListener): boolean;
    /**
     * Add Event Listener
     * Add a listener for an event type.
     * @param type A case-sensitive string representing the event type to listen for
     * @param callback The function which receives a notification when an event of the specified type occurs.
     */
    on(type: Enum, callback: EventListener): () => void;
    /**
     * Remove Event Listener
     * The EventDispatcher.off() method removes from the __events an event listener previously registered with EventDispatcher.on()
     * The event listener to be removed is identified using a combination of the event type, the event listener function itself
     * @param type
     * @param callback
     */
    off(type: Enum, callback?: EventListener): void;
    /**
     * Dispatch Event
     * @param type
     * @param args
     */
    dispatch(type: Enum, ...args: any[]): void;
}
//# sourceMappingURL=main.d.ts.map