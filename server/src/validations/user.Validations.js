import Joi from 'joi'

export const RegisterValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().valid("user", "admin").default("user").required()
})

export const LoginValidation = Joi.object({
    email: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
})