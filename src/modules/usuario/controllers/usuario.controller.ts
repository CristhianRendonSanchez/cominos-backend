import { Request, Response } from 'express';
import errorHandlerObject from '../../error/controllers/error.class';
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

class UsuarioControllers {

    public async UpsertUsuario(req: Request, res: Response): Promise<void> {
        try{
            let { correo, contrasena, cedula, nombre, apellido, cargo} = req.body;
            const cliente = await prisma.usuario.upsert({
              where: {
                correo: correo
              },
              update: {
                contrasena : contrasena,
                cedula : cedula,
                nombre : nombre,
                apellido : apellido,
                cargo : cargo
              },
              create: {
                correo : correo,
                contrasena : contrasena,
                cedula : cedula,
                nombre : nombre,
                apellido : apellido,
                cargo : cargo
              }
            })
            res.status(200).json(cliente);
        } catch (error) {
          let Error: object = await errorHandlerObject.ErrorHandler(
            error,
            'UpsertUsuario (Controller)',
            true,
          );
          res.status(500).json(Error);
        }
    }

    public async GetUsuario(req: Request, res: Response): Promise<void> {
        try {
            const {correo} = req.params;
            // Se verifica si no hay parametros en la ruta, de ser el caso, se arroja un error
            if(correo == null) throw new Error('Correo Undefined');
      
            const usuario = await prisma.usuario.findUnique({
              where: {correo : correo},
            })
            res.status(200).json({ data: usuario });
        } catch (error) {
          let Error: object = await errorHandlerObject.ErrorHandler(
            error,
            'GetUsuario (Controller)',
            true,
          );
          res.status(500).json(Error);
        }
    }

    
    public async DeleteUsuario(req: Request, res: Response): Promise<void> {
        try {
            const {correo} = req.body;
            // Se verifica si no hay parametros en la ruta, de ser el caso, se arroja un error
            if(correo == null) throw new Error('Correo Undefined');
      
            await prisma.usuario.delete({
              where: { correo: correo },
            })
            res.status(200).json("Usuario eliminado de la base de datos.");
        } catch (error) {
          let Error: object = await errorHandlerObject.ErrorHandler(
            error,
            'DeleteUsuario (Controller)',
            true,
          );
          res.status(500).json(Error);
        }
    }
}

const usuarioControllers = new UsuarioControllers();
export default usuarioControllers;