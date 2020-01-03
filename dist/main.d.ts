export declare type TEventCallBack = (...args: any[]) => any;
export interface IEvent<Enum> {
    type: Enum;
    args: any[];
    target: any;
}
export declare class EventDispatcher<Enum, Names extends keyof Enum> {
    protected __events: {
        [index in Names]: TEventCallBack[];
    };
    find(type: Names, callback: TEventCallBack): number;
    has(type: Names, callback: TEventCallBack): boolean;
    on(type: Names, callback: TEventCallBack): void;
    off(type: Names, callback?: TEventCallBack): void;
    dispatch(type: Names, ...args: any[]): void;
}
//# sourceMappingURL=main.d.ts.map