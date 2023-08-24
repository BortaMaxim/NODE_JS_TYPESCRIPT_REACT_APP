import {User} from "../../db/models/user.model";
import bcrypt from "bcryptjs";
import {Role} from "../../db/models/role.model";
import {MailService} from "../nodemailer/mailServices";
import {UserRepository} from "../../repositories/userRepository/UserRepository";
import {IUser} from "../../interfaces/models/User/IUser";
import {Jwt_auth_service} from "../jwt/Jwt_auth_service";

export class Auth_service {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async sign_up(data):Promise<void> {
        const token: string = Jwt_auth_service.generateJwt(
            {
                email: data.email
            },
            '1h'
        )
        let userData: IUser = {
            name: data.name,
            email: data.email,
            password: bcrypt.hashSync(data.password, 6),
            status: 'pending',
            avatar: 'default.jpg',
            confirmedCode: token,
            roles: {role_name: 'user'}
        }
        let options: object = {
            include: Role
        }
        let user: User = await this.userRepository.create(userData, options)
        await user.save()
        const nodemailer: MailService = await MailService.getInstance()
        await nodemailer.sendConfirmationEmail(user.name, user.email, token)
    }

    async email_verify(confirmedCode): Promise<User> {
        return await this.userRepository.find({where: {confirmedCode}})
    }

    async resend(data): Promise<User> {
        return await this.userRepository.find({where: {email: data.email}})
    }

    async sign_in(data) {
        return await this.userRepository.find({
            where: {email: data.email},
            include: Role
        })
    }
}