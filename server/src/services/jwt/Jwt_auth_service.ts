import config from "../../config/envConfig";
import jwt from "jsonwebtoken";

export class Jwt_auth_service<ObjectType extends object> {
     public static generateJwt<ObjectType>(payload:ObjectType, time?:string):string {
        const privateKey:string = config.JWT_SECRET
        const defaultOptions:{expiresIn:string} = {
            expiresIn: time,
        }
        return jwt.sign(payload, privateKey, defaultOptions)
    }

    public static jwtVerify<ObjectType>(token:string, callback:ObjectType):ObjectType {
         return jwt.verify(token, config.JWT_SECRET, callback)
    }
}