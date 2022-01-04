import { Request, Response } from "express";
import errorHandlerObject from "./error.class";

class ErrorControllers {
  public async ObtenerErrores(req: Request, res: Response): Promise<void> {
    try {
      let Filtro: any = req.body.data;
      let DatosConsulta: any;
      let ListaErrores: object[] = DatosConsulta.data;
      res.status(200).json({ error: false, data: ListaErrores });
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        "ObtenerErrores (Controller)",
        true
      );
      res.status(500).json(Error);
    }
  }

  public async ActualizarError(req: Request, res: Response): Promise<void> {
    try {
      let Codigo: string = req.body.data.Codigo;
      let DatosNuevos: object = req.body.data.DatosNuevos;
      let RespuestaActualizar: any;
      res.status(200).json(RespuestaActualizar);
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        "ActualizarError (Controller)",
        true
      );
      res.status(500).json(Error);
    }
  }

  public async EliminarError(req: Request, res: Response): Promise<void> {
    try {
      let Codigo: string = req.body.data.Codigo;
      let RespuestaEliminar: any;
      res.status(200).json(RespuestaEliminar);
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        "EliminarError (Controller)",
        true
      );
      res.status(500).json(Error);
    }
  }
}

const errorControllers = new ErrorControllers();
export default errorControllers;
