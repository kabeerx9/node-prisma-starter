declare module 'express' {
    interface Request {
        user?: User
    }
}

import { Request, Response, NextFunction } from "express";
import { prismaClient } from "..";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { signupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { User } from "@prisma/client";
type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

export const signup: AsyncRequestHandler = async (req, res , next) => {
    // first parse the data
    signupSchema.parse(req.body)

    const {name, email, password} = req.body;

    let user = await prismaClient.user.findFirst({

        where: {
            email: email
        }
    })

    if(user) {
        // directly passed to the error middleware
        throw new BadRequestException("User already exists" , ErrorCodes.USER_ALREADY_EXISTS)
    }

    user = await prismaClient.user.create({
        data: {
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10)
        }
    })

    res.status(200).json({message: "User created successfully", user: user});
};

export const login: AsyncRequestHandler = async (req, res) => {
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({
        where: {
            email: email
        }
    })

    if(user === null) {
        throw new NotFoundException("User not found " , ErrorCodes.USER_NOT_FOUND)
    }

    if(!bcrypt.compareSync(password, user.password)) {
        throw new BadRequestException("Invalid password" , ErrorCodes.INVALID_PASSWORD)
    }

    const token  = jwt.sign({
        userId : user.id
    } ,JWT_SECRET , {expiresIn : '1h'} )


    res.status(200).json({message: "Login successful", token: token, user: user});
};

export const me: AsyncRequestHandler = async (req, res) => {
    res.status(200).json({message: "User fetched successfully", user: req.user});
}
