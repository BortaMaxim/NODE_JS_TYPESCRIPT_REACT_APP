import express, {Router} from "express";
import {group} from "../helpers/groupRoutes";

const authRoutes = require('../routes/authRouter')
const profileRoutes = require('../routes/profileRoutes')

const apiRouter:Router = express.Router()
apiRouter.use('/api', group((router:Router):void => {
    router.use('/auth', authRoutes)
    router.use('/profile', profileRoutes)
}))

export default apiRouter