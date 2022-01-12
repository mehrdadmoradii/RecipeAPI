import {Request, Response} from "express";
import {UserDao, IUserDao} from "../daos/UserDao";
import {UserCreateDTO} from "../entities/User";
import {StatusCodes} from "http-status-codes";
import * as jwt from 'jsonwebtoken';


export default class UserController {

    private static userController: UserController;
    private userDao: IUserDao;

    private constructor() {
        this.userDao = new UserDao();
    }

    static getClass(): UserController {
        if (UserController.userController === undefined) {
            UserController.userController = new UserController();
        }
        return UserController.userController;
    }

    async signUp(req: Request, res: Response) {
        if (!req.body.name || !req.body.username || !req.body.password)
            return res.status(StatusCodes.BAD_REQUEST).json({'message': 'invalid user type!'});

        const newUser = new UserCreateDTO(req.body.name, req.body.username, req.body.password);
        try {

            await UserController.userController.userDao.insertNewUser(newUser);
            return res.status(StatusCodes.CREATED).json({'message': 'new user created!'});

        } catch (e) {

            if (e instanceof Error)
                return res.status(StatusCodes.BAD_REQUEST).json({'message': e.message});

        }
    }

    async signIn(req: Request, res: Response) {
        if (!req.body.username || !req.body.password)
            return res.status(StatusCodes.BAD_REQUEST).json({'message': 'missing username or password'});

        const dao = UserController.userController.userDao;

        try {
            const passwordIsCorrect = await dao.checkPassword(req.body.username, req.body.password);
            if (!passwordIsCorrect)
                return res.status(StatusCodes.BAD_REQUEST).json({'message': 'incorrect username or password'});

            const user = await dao.getOneByUsername(req.body.username);
            const token = jwt.sign({id: user.id, username: user.username}, process.env.secret);
            return res.status(StatusCodes.OK).json({'token': token});
        } catch (e) {
            if (e instanceof Error)
                return res.status(StatusCodes.BAD_REQUEST).json({'message': e.message});
        }

    }

}