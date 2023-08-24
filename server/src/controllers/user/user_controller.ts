import {Profile_service} from "../../services/profile/profile_service";
import {User} from "../../db/models/user.model";
import {IUser} from "../../interfaces/models/User/IUser";
import bcrypt from "bcryptjs";
import {NextFunction, Request, Response} from "express";

export class User_controller {
    private profileService: Profile_service

    constructor() {
        this.profileService = new Profile_service()
    }

    profile = (req, res) => {
        try {
            this.profileService.profile(req.body.user.email).then(user => {
                return res.status(200).json({
                    success: true,
                    user
                })
            })
        } catch (err) {
            throw new Error(err)
        }
    }
    updateUser = (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params
        this.profileService.userUpdate(req.body, id).then((user) => {
            res.json({
                success: true,
                message: "Updated",
                data: user
            });
        }).catch(next)
    }
    uploadAvatar = (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params
        this.profileService.uploadAvatar(req, id).then((user) => {
            res.status(200).json({
                success: true,
                message: "Saved",
                data: user.avatar
            })
        })
    }
}