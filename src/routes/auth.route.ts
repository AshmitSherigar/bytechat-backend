import express from 'express';
import validate from '../middlewares/validate.js';
import { userSchema } from '../validators/auth.validator.js';
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from '../controllers/auth.controller.js';

export const router = express.Router();

router.post('/login', validate(userSchema), loginUser);
router.post('/register', validate(userSchema), registerUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshToken);
