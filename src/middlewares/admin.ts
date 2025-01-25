
import { ErrorCodes } from "../exceptions/root";

import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";

const adminMiddleware = async(req:Request, res:Response, next:NextFunction)=>{

    const user = req.user;
    if(user?.role === 'ADMIN'){
        next();
    }else{
        next(new UnauthorizedException("You are not authorized to access this resource" , ErrorCodes.UNAUTHORIZED))
    }
}

export default adminMiddleware;
