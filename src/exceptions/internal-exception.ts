import { ErrorCodes } from "./root";

import { HttpException } from "./root";

export class InternalException extends HttpException {
    constructor(message : string, errorCode : ErrorCodes, error : any){
        super(message, errorCode, 500, error)
    }
}
