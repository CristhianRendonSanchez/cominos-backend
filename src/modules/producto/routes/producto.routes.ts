import { Router } from 'express';
import productoControllers from '../controllers/producto.controller';

class ProdutoRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/GetProductos', productoControllers.GetProductos);
  }
}

const produtoRoutes = new ProdutoRoutes();
export default produtoRoutes.router;
