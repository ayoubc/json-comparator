import { JsonObj } from "../types";

export function sortObject(obj: JsonObj | JsonObj[]): JsonObj {
    // sort object by key
    const b = toBoolean(obj);
    if (!b) {
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
        // console.log("primitive");
        return obj;
    }
}

export function removeIgnoredKeys(obj: JsonObj | JsonObj[], keysToIgnore: string[]): void {
    if (obj instanceof Array) {
        for(let subObj of obj) {
            removeIgnoredKeys(subObj, keysToIgnore);
        }
        return;
    }
    else if (obj instanceof Object) {
        for(let keyToIgnore of keysToIgnore) {
            delete obj[keyToIgnore];
        }
        const keys: string[] = Object.keys(obj);
        for(let key of keys) {
            removeIgnoredKeys(obj[key], keysToIgnore);
        }
        return;
    }
}

/*
* function that returns a boolean to indicates if two json objects are equal (deeply by inside values)
* for array values two arrays should have same content even if the indices are different
*/
export function isEqual(obj1: any, obj2: any, keysToIgnore?: string[], jsonPath?: string): boolean {
    const b1 = toBoolean(obj1);
    const b2 = toBoolean(obj2);
    if ((b1 && !b2) || (!b1 && b2)) return false;
    if (!b1 && !b2) return true;

    if (typeof obj1 === typeof obj2) {
        if ((isArray(obj1) && !isArray(obj2)) || (isArray(obj2) && !isArray(obj1))) {
            console.log("Objects are not both arrays!");
            return false;
        }
        else {
            // obj1 and obj2 are both objects or arrays
            if (isArray(obj1)) {
                if (obj1.length !== obj2.length) return false;
                for(let i=0;i<obj1.length;i++) {
                    const subResult = isEqual(obj1[i], obj2[i], keysToIgnore, `${jsonPath}[${i}]`);
                    if (!subResult) {
                        console.log(`${jsonPath}[${i}]`);
                        return false;
                    }
                }
                return true;
            }
            else if (isObject(obj1)) {
                for(let key in obj1) {
                    if (keysToIgnore && keysToIgnore.indexOf(key) !== -1) continue;

                    const subResult = isEqual(obj1[key], obj2[key], keysToIgnore, `${jsonPath}.${key}`);
                    if (!subResult) {
                        console.log(`${jsonPath}.${key}`);
                        return false;
                    }
                }
                return true;
            }
            return obj1 === obj2;
        }
    }
    
    return false;
}

export function isArray(obj: any): boolean {
    return obj instanceof Array;
}

export function isObject(obj: any): boolean {
    return obj instanceof Object;
}

export function toBoolean(obj: any): boolean {
    return !!obj;
}
