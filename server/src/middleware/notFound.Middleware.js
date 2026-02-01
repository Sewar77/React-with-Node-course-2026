import { AppError } from "../utils/AppError";

export const notFound = (req, res, next) => {
    next(new AppError(`Can not found ${req.originalUrl} on this sevrer`, 404))
}