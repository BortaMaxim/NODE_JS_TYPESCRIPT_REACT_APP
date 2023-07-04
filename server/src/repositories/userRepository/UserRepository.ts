import {User} from "../../db/models/user.model";

export class UserRepository {
    async create(data, options?):Promise<User> {
        return new User(data, options);
    }

    async find(condition: any): Promise<User> {
        return await User.findOne(condition)
    }
}