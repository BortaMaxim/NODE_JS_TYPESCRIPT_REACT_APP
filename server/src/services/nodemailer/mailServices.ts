import nodemailer from 'nodemailer'
import config from '../../config/envConfig'
import {IMail} from "../../interfaces/mail/IMail";
import {Logging} from "../../library/Logging";

export class MailService {
    private static instance: MailService
    private transporter:nodemailer.Transporter

    constructor() {}
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService()
        }
        return MailService.instance
    }

    async createLocalConnection() {
        let account = await nodemailer.createTestAccount()
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        })
    }
    async createConnection() {
        this.transporter = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secureConnection: true,
            secure: false,
            auth: {
                user: config.SMTP_USERNAME,
                pass: config.SMTP_PASSWORD,
            },
            // tls: {
            //     ciphers:'SSLv3'
            // }
        })
    }
    // async sendMail(
    //     requestId :string | number | string[],
    //     options: IMail
    // ) {
    //     await this.transporter.sendMail({
    //         from: `"${config.SMTP_SENDER || options.from}"`,
    //         to: options.to,
    //         cc: options.cc,
    //         bcc: options.bcc,
    //         subject: options.subject,
    //         text: options.text,
    //         html: options.html
    //     }).then(info => {
    //         Logging.info(`${requestId} - Mail sent success!`)
    //         Logging.info(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`)
    //         if (process.env.NODE_ENV === 'local') {
    //             Logging.info(`${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
    //                 info
    //             )}`)
    //         }
    //         return info
    //     })
    // }
    async verifyConnection() {
        return await this.transporter.verify()
    }
    getTransporter() {
        return this.transporter
    }

    async sendConfirmationEmail(name:string, email:string, confirmationCode:string) {
        await this.transporter.sendMail({
            from: config.SMTP_SENDER,
            to: email,
            subject: "Please confirm your email",
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5000/api/auth/confirm/${confirmationCode}> Confirm email</a>
        </div>`,
        }, (error, info) => {
            if (error) {
                return console.log('error', error);
            }
            console.log('Email sent: ' + info.response);
        })
    }
}