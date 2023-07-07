import {NextFunction, Request, Response} from "express";
import {Auth_service} from "../../services/auth/auth_service";
import {User} from "../../db/models/user.model";
import {MailService} from "../../services/nodemailer/mailServices";
import {Jwt_auth_service} from "../../services/jwt/Jwt_auth_service";

export class Auth_controller {
    auth_service: Auth_service
    private message: string = "User Not found."

    constructor() {
        this.auth_service = new Auth_service()
    }

    sign_up = async (req: Request, res: Response) => {
        try {
            await this.auth_service.sign_up(req.body)
            res.status(200).json({
                success: true,
                message: "User was registered successfully! Please check your email"
            })
        } catch (err) {
            res.status(500).send({message: err})
            res.send({
                message: "User was registered successfully! Please check your email",
            })
        }
    }

    verify_user = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.auth_service.email_verify(req.params.confirmedCode).then(user => {
                if (!user) {
                    return res.status(404).send({message: this.message});
                }
                user.status = 'active'
                user.save()
                res.json({
                    success: true,
                    message: `User confirmed success.`,
                    redirect: '/confirmed-success'
                })
            }).catch((e) => console.log('error', e))
        } catch (err) {
            next(err)
        }
    }
    resend_email = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.auth_service.resend(req.body).then(async user => {
                if (!user) {
                    return res.status(404).send({message: this.message});
                }
                const nodemailer = MailService.getInstance()
                await nodemailer.sendConfirmationEmail(user.name, user.email, user.confirmedCode)
                await res.json({
                    success: true,
                    message: "Resend success."
                })
            })
        } catch (err) {
            next(err)
        }
    }
    sign_in = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let user: User = await this.auth_service.sign_in(req.body)
            let token: string = await Jwt_auth_service.generateJwt({email: req.body.email})
            await res.status(200).json({
                success: true,
                data: user,
                token: token
            })
        } catch (err) {
            next(err)
        }
    }
}