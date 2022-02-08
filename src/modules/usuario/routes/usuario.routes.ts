import { Router } from 'express';
import usuarioControllers from '../controllers/usuario.controller';

class UsuarioRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.put('/UpdateUsuario', usuarioControllers.UpdateUsuario);
    this.router.get('/GetUsuario/:correo', usuarioControllers.GetUsuario);
    this.router.put('/DeleteUsuario', usuarioControllers.DeleteUsuario);
  }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
