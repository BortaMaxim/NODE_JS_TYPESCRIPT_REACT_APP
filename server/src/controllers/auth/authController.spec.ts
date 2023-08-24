import {describe} from "node:test"
import request from 'supertest'
import app from '../../index'
import db from '../../db/config'
import {User} from "../../db/models/user.model";
import {IUser} from "../../interfaces/models/User/IUser";
import bcrypt from "bcryptjs";
import {Logging} from "../../library/Logging";
import {MailService} from "../../services/nodemailer/mailServices";

describe("Auth_Controller.sign_up  /api/register", () => {
    const nodemailer: MailService = MailService.getInstance()
    let req
    beforeAll(async () => {
        await nodemailer.createConnection()
        await db.sync({force: true}).then(() => Logging.info('Connected to Sequelize!'))
        // await server.init()
    })
    beforeEach(async () => {
        req = await request(app)
    })
    afterEach(async () => {

    })
    afterAll(async () => {
        let user = await User.destroy({where: {email: 'John@mail.com'}})
        Logging.info(`${user} destroyed`)
        await db.close().then(() => Logging.info('DB closed'))
    })
    test('expect status 200', async () => {
        let data: IUser = {
            name: 'John',
            email: 'John@mail.com',
            password: bcrypt.hashSync('manjurik123'),
            status: 'pending',
            avatar: 'default.jpg'
        }
        // await nodemailer.sendConfirmationEmail(data.name, data.email, data.confirmedCode)
        await req.post('/api/auth/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
                expect(response.body.success).toBe(true)
                expect(response.body.message).toBe('User was registered successfully! Please check your email')
            })
    });

    test('expect status 400', async () => {
        let user: User = await User.findOne({where: {email: 'John@mail.com'}})
        // await nodemailer.sendConfirmationEmail(user.name, user.email, user.confirmedCode)
        await req.post('/api/auth/register')
            .send({
                email: user.email
            })
            .set('Accept', 'application/json')
            .expect(400)
            .then((response) => {
                expect(response.body.success).toBe(false)
                expect(response.body.message).toBe("email already been taken.")
            })
    });
})