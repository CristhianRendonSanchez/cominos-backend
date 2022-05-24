import { Router } from 'express';
import authControllers from '../controllers/auth.controller';
const verifyToken = require('../../../verifyToken');

class AuthRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/signup', authControllers.SignUp);
    this.router.post('/login', authControllers.LogIn);
    this.router.get('/profile', verifyToken, authControllers.Profile);
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
