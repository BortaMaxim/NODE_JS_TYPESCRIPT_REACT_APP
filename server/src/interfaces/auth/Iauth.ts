import {IUser} from "../models/User/IUser";

export interface Iauth {
    user: IUser,
    accessToke: string,
    message: string
}