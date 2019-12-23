import {LOGGER} from "./Logger";
import {store} from "./ReduxStore";
import {get} from "./Utils";

export interface IReduxOptions {
    prefix?: string;
    start?: string;
    stop?: string;
}

export interface IStateOptions {
    prefix?: string;
    absolute?: boolean;
    defaultValue?: any;
}

export const statePrefixes: Map<any, IReduxOptions> = new Map();
export const redux = (prefixOrOptions?: string | IReduxOptions): any => {
    let options: IReduxOptions = {prefix: ``, start: "componentDidMount", stop: "componentWillUnmount"};
    if (typeof prefixOrOptions === "string") {
        options = Object.assign(options, {prefix: prefixOrOptions});
    } else if (prefixOrOptions !== undefined) {
        options = Object.assign(options, prefixOrOptions);
    }
    return (clazz: any): any => {
        statePrefixes.set(clazz, options);
        return class extends clazz {
            constructor(...args: any) {
                let unsubscribe: () => void;
                super(...args);
                let start = options.start;
                let stop = options.stop;
                if (start && stop) {
                    (this as any)[start] = () => {
                        unsubscribe = store.subscribe(() => this.setState(this));
                        LOGGER.d(`${clazz.name}.${options.start}()`);
                    };
                    (this as any)[stop] = () => {
                        unsubscribe();
                        LOGGER.d(`${clazz.name}.${options.stop}()`);
                    };
                }
            }
        };
    };
};
export const state = (prefixOrOptions?: string | IStateOptions, defaultValue?: any): any => {
    let options: IStateOptions = {prefix: ``, absolute: false, defaultValue: undefined};
    if (typeof prefixOrOptions === "string") {
        options = Object.assign(options, {prefix: prefixOrOptions});
    } else if (prefixOrOptions !== undefined) {
        options = Object.assign(options, prefixOrOptions);
    }
    options.prefix = options.prefix || ``;
    options.defaultValue = options.defaultValue || defaultValue;
    return (beanOrClass: any, name?: string, descriptor?: any) => {
        return {
            get() {
                options.prefix = options.prefix || name || ``;
                const classOptions = statePrefixes.get(beanOrClass.constructor) || {prefix: ``};
                let path: string = options.prefix;
                if (!options.absolute && classOptions.prefix) {
                    path = `${classOptions.prefix}.${options.prefix}`;
                }
                return get(store.getState(), path, options.defaultValue);
            }
        };
    };
};
