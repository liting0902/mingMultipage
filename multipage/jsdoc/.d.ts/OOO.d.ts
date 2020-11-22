declare namespace OOO{
    var aaa: number 
    function getName(id: number | string): string
    class Person {
    static maxAge: number //靜態變數
    static getMaxAge(): number //靜態方法
    constructor(name: string, age: number) //建構函式
    getName(id: number): string //例項方法
    }
    }