import express from 'express';
import { getCurrentUser, login, logout, register } from '../controllers/auth.Controller.js';
import { validate } from '../middleware/validate.Middleware.js';
import { LoginValidation, RegisterValidation } from '../validations/user.Validations.js';
import { authRateLimit } from '../middleware/rateLimit.Middleware.js';

const router = express.Router();

router.post('/auth/login', validate(LoginValidation), authRateLimit, login)

router.post("/logout", logout)

router.post('/auth/register', validate(RegisterValidation), authRateLimit, register)

router.get('/auth/me', getCurrentUser)

export default router;