import config from "../config/envConfig";
import jwt from "jsonwebtoken";

export const generateJWT = (payload: object = {}):string => {
    const privateKey:string = config.JWT_SECRET
    const defaultOptions = {
        expiresIn: '1h',
    }
    return jwt.sign(payload, privateKey, defaultOptions)
}