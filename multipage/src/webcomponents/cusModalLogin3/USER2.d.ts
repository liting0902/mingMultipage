export declare class User {
    public login: string;
    public hashedPassword: string;

    constructor(login?: string, password?: string) {
        this.login = login || "" ;
        //this.hashedPassword = password ? UserHelper.hashPassword(password) : "";
    }
}

export declare function ABC(a1:string):number;
declare function aa(a1:string):number;
export {aa as a2};