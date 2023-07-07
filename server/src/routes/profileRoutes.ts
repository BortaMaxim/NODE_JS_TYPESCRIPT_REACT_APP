import express, {Router} from "express";
import {User_controller} from "../controllers/user/user_controller";
import {authMiddleware} from "../middlewares/authMiddleware";
const router:Router = express.Router()
const user_controller:User_controller = new User_controller()

router.get('/user', authMiddleware, user_controller.profile)

module.exports = router