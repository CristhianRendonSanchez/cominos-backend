import { Request, Response } from 'express';
import errorHandlerObject from '../../error/controllers/error.class';

class ProductoControllers {
  public async GetProductos(req: Request, res: Response): Promise<void> {
    try {
      let Productos: any[] = [];
      res.status(200).json({ data: Productos });
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        'GetProductos (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
  }
}

const productoControllers = new ProductoControllers();
export default productoControllers;
