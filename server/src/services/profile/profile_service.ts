import {UserRepository} from "../../repositories/userRepository/UserRepository";
import {User} from "../../db/models/user.model";
import bcrypt from "bcryptjs";
import path from 'path'

export class Profile_service {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async profile(email): Promise<User> {
        return await this.userRepository.find({where: {email}})
    }

    async userUpdate(data, id): Promise<User> {
        let user: User = await this.userRepository.find({where: {id}})
        if (!user) {
            throw new Error("User is not updated")
        }
        user.name = data.name
        user.email = data.email
        user.password = bcrypt.hashSync(data.password)
        return user.save()
    }

    async uploadAvatar(data, id): Promise<User> {
        let fileName = data['files'].avatar.name
        let avatarFile = data['files'].avatar
        let uploadPath:string = path.resolve(__dirname + '../../../upload/avatar', fileName)
        avatarFile.mv(uploadPath)
        return await this.userRepository.find({where: {id}}).then((user) => {
            user.avatar = fileName
            user.save()
            return user
        })
    }
}