import express, {Express, NextFunction, Request, Response} from "express";
import db from '../db/config'
import {Logging} from "./Logging";
import config from "../config/envConfig";
import PORT from '../config'
import apiRouters from "../routes/apiRotes";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors";
import {MailService} from "../services/nodemailer/mailServices";

export class Server {
    private app: Express
    protected mailService

    constructor() {
        this.mailService = MailService.getInstance()
        this.app = express()
    }

    public init(): Promise<any> {
        return this.initDatabaseConnection().then(() => {
            this.initRoutes()
            this.initServices()
            this.initHeaders()
            return this.initServer()
        })
    }

    private initRoutes() {
        this.app.use(apiRouters)
    }

    private initServices() {
        if (config.NODE_ENV === 'dev') {
            this.mailService.createLocalConnection()
        } else if (process.env.NODE_ENV === 'prod') {
            this.mailService.createConnection()
        }
    }

    private initHeaders() {
        this.app.use(express.json());
        this.app.use(fileUpload({
            limits: {
                fileSize: 10000000,
            },
            createParentPath: true,
            abortOnLimit: true,
        }))
        this.app.use(bodyParser.json());
        this.app.use(cors())
        this.app.use(bodyParser.json({limit: '20mb'}))

        this.app.use(bodyParser.urlencoded({
            extended: true
        }))
        this.app.use(function (req: Request, res: Response, next: NextFunction): void {
            res.header(
                "Access-Control-Allow-Headers",
                "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        })
    }

    private initServer() {
        return this.app.listen(PORT, () => Logging.info(`Server listening on ${config.HOST} on port ${PORT}`))
    }

    private async initDatabaseConnection(): Promise<void> {
        return await db.sync().then(async () => {
            await Logging.info(`Running on ENV = ${config.NODE_ENV}`);
            await Logging.info('Connected to Sequelize!');
        })
    }

    public close() {
        let server = this.initServer()
        db.close().then(() => {
            Logging.info('DB closed!')
        })
        return server.close((err) => {
            if (err) {
                Logging.error(`There was an error .. ${err.message}`)
                process.exit(1)
            } else {
                Logging.info('http server closed successfully. Exiting!')
                process.exit(0)
            }
            Logging.error('Server closed')
        })
    }
}