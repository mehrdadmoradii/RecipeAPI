import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import StatusCodes from 'http-status-codes';
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import userRouter from "./routers/UserRouter";

const app = express();
dotenv.config();

/********************************************************
 *              Set basic express settings
 ********************************************************/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

/*********************************************************
 *                  Setting up routes
 *********************************************************/

app.use('/api/user', userRouter);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   return res.status(StatusCodes.BAD_REQUEST).json({
      error: err.message
   });
});

// Not Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
   return res.status((StatusCodes.NOT_FOUND)).send();
});

export default app;