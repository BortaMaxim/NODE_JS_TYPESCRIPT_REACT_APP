import {User} from "../../db/models/user.model";
import {IUser} from "../../interfaces/models/User/IUser";
import {FindOptions} from "sequelize/types/model";

export class UserRepository {
    async create(data, options?):Promise<User> {
        return new User(data, options);
    }

    async find(condition: FindOptions<IUser>): Promise<User> {
        return await User.findOne(condition)
    }
}