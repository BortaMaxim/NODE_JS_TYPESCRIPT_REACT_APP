import {Sequelize} from 'sequelize-typescript'
import config from '../config/envConfig'
import {User} from "./models/user.model";
import {Role} from "./models/role.model";
import {UserRole} from "./models/userRole.model";

let connection: Sequelize
switch (config.NODE_ENV) {
    case 'prod':
        connection = new Sequelize(config.DATABASE, config.USER_NAME, config.PASSWORD, {
            dialect: config.DIALECT,
            host: config.HOST,
            logging: false,
            models: [User, Role, UserRole]
        })
        break
    case 'test':
        connection = new Sequelize(config.TEST_DATABASE, config.USER_NAME, config.PASSWORD, {
            dialect: config.DIALECT,
            host: config.HOST,
            logging: false,
            models: [User, Role, UserRole]
        })
        break
    default:
        break
}
export default connection