import { Request, Response } from 'express';
import errorHandlerObject from '../../error/controllers/error.class';
import { cliente, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

class ClienteControllers {

  public async UpsertCliente(req: Request, res: Response): Promise<void> {
    try{
      let { cedula, ciudad, empresa, correo, telefono, createdAt, updatedAt } = req.body;
      const cliente = await prisma.cliente.upsert({
        where: {
          cedula: cedula
        },
        update: {
          ciudad : ciudad,
          empresa : empresa,
          correo : correo,
          telefono : telefono
        },
        create: {
          cedula: cedula,
          ciudad : ciudad,
          empresa : empresa,
          correo : correo,
          telefono : telefono
        }
      })
      res.status(200).json(cliente);
    }catch(error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        'GetCliente (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
    
  }

  //Función para obtener Cliente a partir de la cedula.
  public async GetCliente(req: Request, res: Response): Promise<void> {

    try {
      const {cedula} = req.params;
      // Se verifica si no hay parametros en la ruta, de ser el caso, se arroja un error
      if(cedula == null) throw new Error('Cedula Undefined');
      
      const cliente = await prisma.cliente.findUnique({
        where: { cedula: cedula },
      })
      res.status(200).json({ data: cliente });
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        'GetCliente (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
  }

  public async DeleteCliente(req: Request, res: Response): Promise<void> {
    try {
      const {cedula} = req.body;
      // Se verifica si no hay parametros en la ruta, de ser el caso, se arroja un error
      if(cedula == null) throw new Error('Cedula Undefined');
      
      await prisma.cliente.delete({
        where: { cedula: cedula },
      })
      res.status(200).json("Cliente eliminado de la base de datos.");
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        'GetCliente (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
  }

  /*
  //Función para crear cliente a partir de su cedula, ciudad, empresa, correo, teléfono, fecha de creación y actualización.
  public async PostCliente(req: Request, res: Response): Promise<void> {
    try {
      let { cedula, ciudad, empresa, correo, telefono } = req.body;
      const cliente = await prisma.cliente.create({
        data: { cedula,ciudad,empresa,correo,telefono},
      })
      res.status(200).json(cliente)
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        'GetCliente (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
  }
  */

  /*
  //Función para actualizar cliente a partir de su cedula e ingresando sus nuevos datos.
  public async PutCliente(req: Request, res: Response): Promise<void> {
    try {
      let { cedula, ciudad, empresa, correo, telefono} = req.body;
      const cliente = await prisma.cliente.update({
        where: {
          cedula: cedula,
        },
        data: { 
            ciudad : ciudad,
            empresa : empresa,
            correo : correo,
            telefono : telefono,
        }
      });
      res.status(200).json(cliente)
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        'GetCliente (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
  }
  */

}

const clienteControllers = new ClienteControllers();
export default clienteControllers;