import {NextFunction, Request, Response} from "express";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

export const validatorMiddleware = (dtoClass) => (req: Request, res:Response, next:NextFunction) => {
    const output: any = plainToClass(dtoClass, req.body)
    validate(output, {skipMissingProperties: true}).then(errors => {
        if(errors.length > 0) {
            let errorTexts = []
            for (const errorItem of errors) {
                errorTexts = errorTexts.concat(errorItem.constraints)
            }
            res.status(400).send(errorTexts)
            return
        } else {
            res.locals.input = output
            next()
        }
    })
}