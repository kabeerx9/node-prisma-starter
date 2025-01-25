import { User } from "@prisma/client";
import express ,{ Request } from "express";
declare module 'express' {
    interface Request {
        user?: User
    }
}
 