import { Router } from "express";
import errorControllers from "../controllers/error.controllers";

class ErrorRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/ObtenerErrores", errorControllers.ObtenerErrores);
    this.router.post("/ActualizarError", errorControllers.ActualizarError);
    this.router.post("/EliminarError", errorControllers.EliminarError);
  }
}

const errorRoutes = new ErrorRoutes();
export default errorRoutes.router;
