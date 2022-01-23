import { Router } from 'express';
import clienteControllers from '../controllers/cliente.controller';

class ClienteRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/GetCliente/:cedula', clienteControllers.GetCliente);
    //this.router.post('/PostCliente', clienteControllers.PostCliente);
    //this.router.put('/PutCliente', clienteControllers.PutCliente);
    this.router.post('/UpsertCliente', clienteControllers.UpsertCliente);
    this.router.delete('/DeleteCliente', clienteControllers.DeleteCliente);
  }
}

const clienteRoutes = new ClienteRoutes();
export default clienteRoutes.router;
