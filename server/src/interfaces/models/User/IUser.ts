import {IRole} from "../Role/IRole";

export interface IUser {
    id?: any,
    name: string,
    email: string,
    password: string,
    status?: any,
    avatar: string,
    confirmedCode?: string,
    createdAt?: Date,
    updatedAt?: Date
    roles: IRole
}