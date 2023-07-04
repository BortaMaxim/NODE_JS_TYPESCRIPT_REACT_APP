import express, {Router} from "express";
import {Auth_controller} from "../controllers/auth/auth_controller";
import {singUpValidation} from "../middlewares/singUpValidation";
import {singInValidation} from "../middlewares/singInValidation";

const router:Router = express.Router()
const auth_controller: Auth_controller = new Auth_controller()

router.post('/register', singUpValidation, auth_controller.sign_up)
router.get('/confirm/:confirmedCode', auth_controller.verify_user)
router.post('/resend-email', auth_controller.resend_email)
router.post('/login', singInValidation, auth_controller.sign_in)

module.exports = router