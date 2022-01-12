import {Router} from "express";
import authMiddleware, {IGetUserAuthInfoRequest} from "../middlewares/authMiddleware";

const router = Router();

// @ts-ignore
router.get('/', authMiddleware, (req: IGetUserAuthInfoRequest, res) => {
    console.log(req.user);
    res.send('hello recipe controller');
})

export default router;