import { Router } from 'express';
import usuarioControllers from '../controllers/usuario.controller';

class UsuarioRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/UpsertUsuario', usuarioControllers.UpsertUsuario);
    this.router.get('/GetUsuario/:correo', usuarioControllers.GetUsuario);
    this.router.delete('/DeleteUsuario', usuarioControllers.DeleteUsuario);
  }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
