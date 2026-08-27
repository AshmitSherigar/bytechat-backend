import express from 'express';
import { loginController, registerController } from '../controllers/auth.controller.js';
import { authMiddlleware } from '../middlewares/auth.middleware.js';

export const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', authMiddlleware, (req, res) => {
  console.log(res.locals);
});
