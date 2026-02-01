export class AppError extends Error {
    constructor(mssages, statusCode) {
        super(mssages)

        this.statusCode = statusCode; //4..
        //optional and extra but recommened
        this.status = `${statusCode}`.startsWith("4") ? "fail/bad request" : "error"

        this.isOberational = true // validation, auth , not found ,...

        Error.captureStackTrace(this, this.constructor)
    }
}

//writen for once