import { Request, Response } from 'express';
import errorHandlerObject from '../../error/controllers/error.class';
import { PrismaClient, usuario } from '@prisma/client';

const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

class UsuarioControllers {
  public async UpdateUsuario(req: Request, res: Response): Promise<void> {
    try {
      let { correo, contrasena, cedula, nombre, apellido, cargo } = req.body;

      const usuario = await prisma.usuario.findUnique({
        where: { correo: correo },
      });

      contrasena = await UsuarioControllers.encryptPassword(contrasena);

      // Se verifica si no hay parametros en la ruta, de ser el caso, se arroja un error
      if (correo == null) throw new Error('Correo Undefined');

      //se verifica si el usuario existe
      if (usuario == null) throw new Error('Usuario not found');

      //se verifica el estado del usuario
      if (!usuario.estado) throw new Error('Usuario not avaible');

      //actualizamos al Usuario
      await prisma.usuario.update({
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
        'UpdateUsuario (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
  }

  public async GetUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { correo } = req.params;

      //obtenemos al usuario
      const usuario = await prisma.usuario.findUnique({
        where: { correo: correo },
        select: {
          correo: true,
          contrasena: false,
          cedula: true,
          nombre: true,
          apellido: true,
          cargo: true,
          estado: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // Se verifica si no hay parametros en la ruta, de ser el caso, se arroja un error
      if (correo == null) throw new Error('Correo Undefined');

      //se verifica si el usuario existe
      if (usuario == null) throw new Error('Usuario not found');

      //se verifica el estado del usuario
      if (!usuario.estado) throw new Error('Usuario not avaible');

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

      const usuario = await prisma.usuario.findUnique({
        where: { correo: correo },
      });

      // Se verifica si no hay parametros en la ruta, de ser el caso, se arroja un error
      if (correo == null) throw new Error('Correo Undefined');

      //se verifica si el usuario existe
      if (usuario == null) throw new Error('Usuario not found');

      //se verifica el estado del usuario
      if (!usuario.estado) throw new Error('Usuario not avaible');

      //se cambia el estado del Usuario
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

  static async encryptPassword(password: any): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

const usuarioControllers = new UsuarioControllers();
export default usuarioControllers;
