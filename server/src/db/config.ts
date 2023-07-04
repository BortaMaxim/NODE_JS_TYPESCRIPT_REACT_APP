import {Sequelize, SequelizeOptions} from 'sequelize-typescript'
import config from '../config/envConfig'
import {User} from "./models/user.model";
import {Role} from "./models/role.model";
import {UserRole} from "./models/userRole.model";

const connection: Sequelize = new Sequelize({
    dialect: config.DIALECT,
    host: config.HOST,
    username: config.USER_NAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    logging: false,
    models: [User, Role, UserRole]
})

export default connection