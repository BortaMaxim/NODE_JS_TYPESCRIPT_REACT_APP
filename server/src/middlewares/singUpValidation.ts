import {
    AlternativeValidationError,
    body,
    FieldValidationError,
    GroupedAlternativeValidationError,
    Result,
    UnknownFieldsError,
    ValidationChain,
    validationResult
} from "express-validator";
import {User} from "../db/models/user.model";

export const singUpValidation: (ValidationChain | ((req, res, next) => any))[] = [
    body("name")
        .exists({checkFalsy: true})
        .withMessage("User name is required")
        .isString()
        .withMessage("User name should be string"),
    body("email").optional().isEmail().withMessage("Provide valid email"),
    body('password').exists()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password should be string")
        .isLength({min: 6})
        .withMessage("Password should be at least 6 characters"),
    async (req, res, next):Promise<any> => {
        let user: User = await User.findOne({where: {email: req.body.email}})
        if (user !== null && user.email === req.body.email) {
            return res.status(400).json({
                success: false,
                message: "email already been taken."
            })
        }
        const errors: Result<AlternativeValidationError | GroupedAlternativeValidationError | UnknownFieldsError | FieldValidationError> = await validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        next()
    }
]