declare class User {
    static maxAge: number //靜態變數
    static getMaxAge(): number //靜態方法
    constructor(name: string, age: number) //建構函式
    getName(id: number): string
}
export default User

export declare function getMoney(aaa: number);
export declare function bar(p: string): string;
// export declare module 'moment' {
//     export function foo(): number;
// };
export declare const PPP: number;

export declare class User2 {
    static maxAge: number //靜態變數
    static getMaxAge(): number //靜態方法
    constructor(name: string, age: number) //建構函式
    getName(id: number): string
}

// export declare module "abcde" {
//     export let a: number
//     export function b(): number
//     export namespace c {
//         let cd: string
//     }
// }