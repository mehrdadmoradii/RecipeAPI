import {Router} from "express";
import UserController from '../controllers/UserController';

const userRouter = Router();
const controller = UserController.getClass();

userRouter.post('/signup', controller.signUp);
userRouter.post('/signin', controller.signIn);

export default userRouter;