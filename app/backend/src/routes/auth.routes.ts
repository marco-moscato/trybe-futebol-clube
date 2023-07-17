import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import Validations from '../middlewares/validations.middleware';
import Auth from '../middlewares/auth.middleware';

const authController = new AuthController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req, res) => authController.login(req, res),
);

router.get(
  '/role',
  Auth.verifyToken,
  (req, res) => authController.userRole(req, res),
);

export default router;
