import express, {Express, NextFunction, Request, Response, Router} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "../db/config";
import {Logging} from "./Logging";
import config from "../config/envConfig";
import {MailService} from "../services/nodemailer/mailServices";

export class ExpressServer {
    public static async start() {
        try {
            const apiRoutes: Router = require('../routes/apiRotes')
            const app: Express = express()
            app.use(express.json());

            app.use(bodyParser.json());

            app.use(bodyParser.urlencoded({
                extended: true
            }))
            app.use(function(req:Request, res:Response, next:NextFunction):void {
                res.header(
                    "Access-Control-Allow-Headers",
                    "x-access-token, Origin, Content-Type, Accept"
                );
                next();
            })
            app.use(cors())
            app.use(bodyParser.json({limit: '20mb'}))
            app.use(apiRoutes)
            Logging.info('Connecting with SMTP Server...')
            const mailService:MailService = MailService.getInstance()
            if (config.NODE_ENV === 'local') {
                await mailService.createLocalConnection();
            } else if (process.env.NODE_ENV === 'production') {
                await mailService.createConnection();
            }
            Logging.info('SMTP Server Connected');
            Logging.info('SMTP Connection verified');
            await db.sync().then(() => {
                Logging.info(`Running on ENV = ${config.NODE_ENV}`);
                Logging.info('Connected to Sequelize!');
            })
            await app.listen(config.PORT, () => console.log(`Server listening on ${config.HOST} on port ${config.PORT}`))
        } catch (e) {
            console.log(e)
            process.exit(1)
        }
    }
}