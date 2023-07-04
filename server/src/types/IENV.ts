export interface IENV {
    PORT: string | undefined
    DATABASE: string | undefined,
    USER_NAME: string | undefined,
    PASSWORD: string | undefined,
    HOST: string | undefined,
    MYSQL_PORT: string | undefined,
    DIALECT: any | undefined,
    JWT_SECRET: string | undefined,
    SMTP_HOST: string | undefined,
    SMTP_PORT: string | undefined,
    SMTP_USERNAME: string | undefined,
    SMTP_PASSWORD: string | undefined,
    SMTP_SENDER: string | undefined,
    SMTP_TLS: any | undefined,
    NODE_ENV: string | undefined,
}