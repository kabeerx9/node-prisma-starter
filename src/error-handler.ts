import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
export const errorHandler = (method:Function)=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        try {
            await method(req , res , next);
        } catch (error : any ) {
            let exception : HttpException;
            if(error instanceof HttpException){
                exception = error;
            }else{
                if(error instanceof ZodError){
                    exception = new BadRequestException("Unprocessable Entity" , ErrorCodes.UNPROCESSABLE_ENTITY , error)
                }else{
                    exception = new InternalException("Internal server error" , ErrorCodes.INTERNAL_SERVER_ERROR, error)
                }
            }

            next(exception);
        }

    }
}
