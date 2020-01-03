export declare type TEventCallBack = (...args: any[]) => any;
export interface DispatchAbleEvent<Enum> {
    type: Enum;
    args: any[];
    target: any;
}
export declare class EventDispatcher<Enum extends string> {
    protected __events: {
        [index: string]: TEventCallBack[];
    };
    find(type: Enum, callback: TEventCallBack): number;
    has(type: Enum, callback: TEventCallBack): boolean;
    on(type: Enum, callback: TEventCallBack): void;
    off(type: Enum, callback?: TEventCallBack): void;
    dispatch(type: Enum, ...args: any[]): void;
}
//# sourceMappingURL=main.d.ts.map