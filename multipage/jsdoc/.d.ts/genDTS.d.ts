declare namespace Express {
    import("./user");  // Don't delete this line.
    import { User } from "./user";
  
    export interface Request3 {
      user: User;
      target: User;
      friend: User;
    }
  
    export class SuperUser extends User {
      superPower: string;
    }
  
    export { User as ExpressUser }
  }