import express, {Router} from "express";

export const group = ((callback: (router: Router) => void) => {
    const router:Router = express.Router();
    callback(router);
    return router;
});