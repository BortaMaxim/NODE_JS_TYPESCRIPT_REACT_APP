export interface IConfig {
    PORT: string
    DATABASE: string,
    USER_NAME: string,
    PASSWORD: string,
    HOST: string,
    MYSQL_PORT: string,
    DIALECT: any,
    JWT_SECRET: string,
    SMTP_HOST: string,
    SMTP_PORT: string,
    SMTP_USERNAME: string,
    SMTP_PASSWORD: string,
    SMTP_SENDER: string,
    SMTP_TLS: any
    NODE_ENV: string
}