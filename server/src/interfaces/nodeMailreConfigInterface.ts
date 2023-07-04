export interface AuthAttributes {
    type: string,
    user: string,
    pass: string,
    clientId: string,
    clientSecret: string
}
export interface TransportAttributes {
    service: string,
    auth: Record<string, AuthAttributes>
}
export interface OptionsAttributes {
    from: string,
    to: string,
    subject: string,
    html: any
}