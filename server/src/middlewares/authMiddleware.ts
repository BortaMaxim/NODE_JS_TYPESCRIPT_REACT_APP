import {Jwt_auth_service} from "../services/jwt/Jwt_auth_service";
import {NextFunction, Request, Response} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction):void => {
    let authHeader:string = req.headers.authorization
    if (authHeader) {
        const token:string = authHeader.split(' ')[1]
         Jwt_auth_service.jwtVerify(token, (err:object, user: object) => {
            if (err) {
                return res.status(401).send("unauthorized")
            }
            req.body.user = user
            next()
        })
    } else {
        res.status(401).send("Please authenticate")
        next()
    }
}