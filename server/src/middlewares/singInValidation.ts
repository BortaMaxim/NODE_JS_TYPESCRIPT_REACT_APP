import {
    AlternativeValidationError,
    body, FieldValidationError,
    GroupedAlternativeValidationError,
    Result, UnknownFieldsError,
    ValidationChain, validationResult
} from "express-validator";
import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import {User} from "../db/models/user.model";
import {Role} from "../db/models/role.model";

export const singInValidation: (ValidationChain | ((req, res, next) => any))[] = [
    body("email").optional().isEmail().withMessage("Provide valid email"),
    body('password').exists()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password should be string")
        .isLength({min: 6})
        .withMessage("Password should be at least 6 characters"),
    async (req: Request, res: Response, next) => {
        const errors: Result<AlternativeValidationError | GroupedAlternativeValidationError | UnknownFieldsError | FieldValidationError> = await validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        await User.findOne({where: {email: req.body.email}, include: Role}).then((user => {
            if (!user) return res.status(404).send({message: "User not found."})
            if (user.status === 'pending') return res.status(403).send({message: "Please confirm your email."})
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )
            if (!passwordIsValid) return res.status(401).send({accessTokeN: null, message: "Invalid password.."})
        }))
        next()
    }
]
