import { JsonObj } from "../types";

export function sortObject(obj: JsonObj | JsonObj[]): JsonObj {
    // sort object by key
    const truthy = !!obj;
    if (!truthy) {
        console.log("falsy value: ", obj);
        return obj;
    }
    if (obj instanceof Array) {
        const arr: string[] = [];
        for(let subObj of obj) {
            arr.push(JSON.stringify(sortObject(subObj)));
        }
        arr.sort();
        const result: JsonObj[] = [];
        for(let str of arr) {
            result.push(JSON.parse(str));
        }
        return result;
    }
    else if (obj instanceof Object) {
        const keys: string[] = Object.keys(obj);
        keys.sort();
        const result: JsonObj = {};
        for(let key of keys) {
            result[key] = sortObject(obj[key]);
        }
        return result;
    }
    else {
        console.log("primitive");
        return obj;
    }
}

export function compareObjects(obj1: Object, obj2: Object) {
    // if () 
}