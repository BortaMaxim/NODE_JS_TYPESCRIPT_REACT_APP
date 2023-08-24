import express, {Express, NextFunction, Request, Response, Router} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload'
import db from "./db/config";
import {Logging} from "./library/Logging";
import config from "./config/envConfig";
import {MailService} from "./services/nodemailer/mailServices";
import PORT from './config'
import apiRoutes from './routes/apiRotes'

const app: Express = express()
try {
    app.use(express.json());
    app.use(fileUpload({
        limits: {
            fileSize: 10000000,
        },
        createParentPath: true,
        abortOnLimit: true,
    }))
    app.use(bodyParser.json());
    app.use(cors())
    app.use(bodyParser.json({limit: '20mb'}))

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(function (req: Request, res: Response, next: NextFunction): void {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    app.use(apiRoutes)
    Logging.info('Connecting with SMTP Server...')
    const mailService: MailService = MailService.getInstance()
    if (config.NODE_ENV === 'dev') {
        mailService.createLocalConnection()
    } else if (process.env.NODE_ENV === 'prod') {
        mailService.createConnection()
        Logging.info('SMTP Server Connected');
        Logging.info('SMTP Connection verified');
        db.sync().then(() => {
            Logging.info(`Running on ENV = ${config.NODE_ENV}`);
            Logging.info('Connected to Sequelize!');
        })
    }
    app.listen(PORT, () => Logging.info(`Server listening on ${config.HOST} on port ${PORT}`))
} catch (e) {
    Logging.error(`ERROR SERVER... ${e}`)
    process.exit(1)
}
export default app