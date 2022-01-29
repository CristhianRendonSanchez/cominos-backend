import { Request, Response } from 'express';
import errorHandlerObject from '../../error/controllers/error.class';
import { PrismaClient, usuario } from '@prisma/client';

const prisma = new PrismaClient();

class UsuarioControllers {
  public async UpdateUsuario(req: Request, res: Response): Promise<void> {
    try {
      let { correo, contrasena, cedula, nombre, apellido, cargo } = req.body;
      const usuario: usuario = await prisma.usuario.update({
        where: {
          correo: correo,
        },
        data: {
          contrasena: contrasena,
          cedula: cedula,
          nombre: nombre,
          apellido: apellido,
          cargo: cargo,
        },
      });
      res.status(200).json('usuario updated');
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
      const { correo } = req.params;
      // Se verifica si no hay parametros en la ruta, de ser el caso, se arroja un error
      if (correo == null) throw new Error('Correo Undefined');

      const usuario = await prisma.usuario.findUnique({
        where: { correo: correo },
        select: {
          correo: true,
          contrasena: false,
          cedula: true,
          nombre: true,
          apellido: true,
          cargo: true,
          createdAt: true,
          updatedAt: true,
        },
      });
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
      const { correo } = req.body;
      // Se verifica si no hay parametros en la ruta, de ser el caso, se arroja un error
      if (correo == null) throw new Error('Correo Undefined');

      await prisma.usuario.update({
        where: { correo: correo },
        data: {
          estado: false,
        },
      });
      res.status(200).json('Usuario eliminado de la base de datos.');
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
