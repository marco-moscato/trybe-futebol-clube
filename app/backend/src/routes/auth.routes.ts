import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import Validations from '../middlewares/validations.middleware';
import Auth from '../middlewares/auth.middleware';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';
import Jwt from '../utils/jwtAuth';

const jwt = new Jwt();
const userModel = new UserModel();
const userService = new UserService(userModel, jwt);
const authController = new AuthController(userService);

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
