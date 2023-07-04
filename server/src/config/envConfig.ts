import * as path from 'node:path'
import * as dotenv from "dotenv";
import {IENV} from '../types/IENV'
import {IConfig} from "../types/IConfig";

dotenv.config()

const getConfig = ():IENV => {
    return {
        PORT: process.env.PORT,
        DATABASE: process.env.DATABASE,
        USER_NAME: process.env.USER_NAME,
        PASSWORD: process.env.PASSWORD,
        HOST: process.env.HOST,
        MYSQL_PORT: process.env.MYSQL_PORT,
        DIALECT: process.env.DIALECT,
        JWT_SECRET: process.env.JWT_SECRET,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USERNAME: process.env.SMTP_USERNAME,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        SMTP_SENDER: process.env.SMTP_SENDER,
        SMTP_TLS: process.env.SMTP_TLS,
        NODE_ENV: process.env.NODE_ENV
    }
}

const getSanitizedConfig = (config: IENV): IConfig => {
    for (const[key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`)
        }
    }
    return config as IConfig
}

const envConfig: IENV = getConfig()
const sanitizedConfig:IConfig = getSanitizedConfig(envConfig)
export default sanitizedConfig