import rateLimit from "express-rate-limit"

export const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        message: "Too Many requests, please try later"
    },
    standardHeaders: true,
    legacyHeaders: false,
})

export const authRateLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: {
        message: "Too Many Login/Register Atempts, please try later"
    }
})

