import express, {Router} from "express";
import {User_controller} from "../controllers/user/user_controller";
import {authMiddleware} from "../middlewares/authMiddleware";
import {singUpValidation} from "../middlewares/singUpValidation";
import {avatarValidationMiddleware} from "../middlewares/avatarValidationMiddleware";

const router: Router = express.Router()
const userController: User_controller = new User_controller()

router.get('/user', authMiddleware, userController.profile)
router.post('/user-update/:id', authMiddleware, singUpValidation, userController.updateUser)
router.post('/upload-avatar/:id', authMiddleware, avatarValidationMiddleware, userController.uploadAvatar)
module.exports = router