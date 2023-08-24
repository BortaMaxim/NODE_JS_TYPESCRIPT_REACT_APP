export interface IConfig {
    PORT: string | number
    DATABASE: string,
    USER_NAME: string,
    PASSWORD: string,
    HOST: string,
    MYSQL_PORT: number,
    DIALECT: any,
    JWT_SECRET: string,
    SMTP_HOST: string,
    SMTP_PORT: string,
    SMTP_USERNAME: string,
    SMTP_PASSWORD: string,
    SMTP_SENDER: string,
    SMTP_TLS: any
    NODE_ENV: string,
    TEST_DATABASE: string,
    TEST_PORT: string | number
}