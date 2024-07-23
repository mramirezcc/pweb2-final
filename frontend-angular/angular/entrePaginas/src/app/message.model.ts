import { User } from "./user.model";
export interface Message {
    message: String;
    sender: User;
    date: Date;
}
  