import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import Validations from '../middlewares/validations.middleware';
import Auth from '../middlewares/auth.middleware';
import UserModel from '../models/user.model';

const authController = new AuthController();
const userModel = new UserModel();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req, res) => authController.login(req, res),
);

router.get(
  '/role',
  Auth.verifyToken,
  async (req, res) => {
    const userRole = res.locals.user.role;
    return res.status(200).json({ role: userRole });
  }
);

export default router;
