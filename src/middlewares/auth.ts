
import { ErrorCodes } from "../exceptions/root";

import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { JWT_SECRET } from "../secrets";
import jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { User } from "@prisma/client";

const authMiddleware = async(req:Request, res:Response, next:NextFunction)=>{
    // 1 :  extract the token from the header
    // 2 : If token is not present throw an error of unauthorized
    // 3 : If token is present, verify the token
    // 4 : If token is valid, set the user id in the request object
    // 5 : If token is invalid, throw an error of unauthorized

    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        next(new UnauthorizedException("Unauthorized" , ErrorCodes.UNAUTHORIZED))
    }

    try {
        const decoded  = jwt.verify(token as string , JWT_SECRET) as any;
        // how to omit the password from the user object
        const user = await prismaClient.user.findFirst({
            where : {
                id : decoded.userId
            },
            select : {
                id : true,
                name : true,
                email : true,
                createdAt : true,
                updatedAt : true
            }
        })

        if(!user){
            next(new UnauthorizedException("Unauthorized" , ErrorCodes.UNAUTHORIZED))
        }

        req.user = user as User;
        next();
    } catch (error) {
        next(new UnauthorizedException("Unauthorized" , ErrorCodes.UNAUTHORIZED))
    }



}

export default authMiddleware;
