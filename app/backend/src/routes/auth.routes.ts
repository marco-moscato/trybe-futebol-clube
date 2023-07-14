import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import Validations from '../middlewares/validations.middleware';

const authController = new AuthController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req, res) => authController.login(req, res),
);

export default router;
