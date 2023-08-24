import config from './config/envConfig'

let port:number | string | undefined

switch (config.NODE_ENV) {
    case 'prod':
        port = config.PORT
        break
    case 'test':
        port = config.TEST_PORT
        break
    default:
        break
}

export default port