import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import {StatusCodes} from "http-status-codes";

// https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
export interface IGetUserAuthInfoRequest extends Request {
    user: any
}

export default function authMiddleware(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {

    let token = req.headers.authorization;
    if (!token)
        return res.status(StatusCodes.UNAUTHORIZED).json({'message': 'this resource requires authentication'});

    token = token.split(" ")[1];

    jwt.verify(token, process.env.secret, (err, user) => {
        if (err) return res.status(StatusCodes.UNAUTHORIZED).json({'message': 'token is not valid'});
        req.user = {'id': user.id, 'username': user.username};
        next();
    })

}