import {lowerCase} from 'lodash';

export const entityTables: Map<any, string> = new Map();
export const entitySchemas: Map<any, string> = new Map();
export const entity = (config: { table?: string, schema?: string }) => {
    let {table, schema} = config;
    return (clazz?: any, method?: any, descriptor?: any) => {
        table = table || lowerCase(clazz.name);
        entityTables.set(clazz, table);
        entitySchemas.set(clazz, schema);
        clazz.TABLE = table;
        return descriptor;
    }
};
export const entityIds: Map<any, string> = new Map();
export const id = () => {
    return (clazz?: any, method?: any, descriptor?: any) => {
        entityTables.set(clazz, method);
        clazz.ID = method;
        return descriptor;
    }
};
