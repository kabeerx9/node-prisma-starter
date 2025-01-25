// message , status code , error codes , error

export class HttpException extends Error{
    message : string;
    errorCode : ErrorCodes;
    statusCode : number;
    error : any ;

    constructor(message : string, errorCode : ErrorCodes , statusCode : number, error : any){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.error = error;
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    INVALID_PASSWORD = 1002,
    USER_ALREADY_EXISTS = 1003,
    INTERNAL_SERVER_ERROR = 1004,
    INVALID_CREDENTIALS = 1005,
    UNAUTHORIZED = 1006,
    FORBIDDEN = 1007,
    BAD_REQUEST = 1008,
    NOT_FOUND = 1009,
    UNPROCESSABLE_ENTITY = 1010
}
