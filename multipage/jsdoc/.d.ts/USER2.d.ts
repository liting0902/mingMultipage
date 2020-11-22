export class User {
    public login: string;
    public hashedPassword: string;

    constructor(login?: string, password?: string) {
        this.login = login || "" ;
        this.hashedPassword = password ? UserHelper.hashPassword(password) : "";
    }
}