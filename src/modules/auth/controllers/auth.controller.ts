import { Request, Response } from 'express';
import errorHandlerObject from '../../error/controllers/error.class';
import { PrismaClient } from '@prisma/client';
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class AuthControllers {
  public async SignUp(req: Request, res: Response): Promise<void> {
    try {
      let { correo, contrasena, cedula, nombre, apellido, cargo } = req.body;

      let usuario = await prisma.usuario.findUnique({
        where: { correo: correo },
      });

      //se verifica si el correo de entrada está vacio
      if (correo == null) throw new Error('correo Undefined');

      //se verifica si el usuario existe
      if (usuario != null) {
        //se verifica el estado del usuario
        if (!usuario.estado) {
          throw new Error('Usuario already exist and not avaible');
        } else {
          throw new Error('Usuario already exist');
        }
      }

      //se encripta la contrasena
      contrasena = await AuthControllers.encryptPassword(contrasena);

      //se crea al usuario
      usuario = await prisma.usuario.create({
        data: {
          correo: correo,
          contrasena: contrasena,
          cedula: cedula,
          nombre: nombre,
          apellido: apellido,
          cargo: cargo,
        },
      });

      //se instancia un token para el usuario.
      const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({ auth: true, token: token });
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        'SignUp (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
  }

  public async Profile(req: Request, res: Response): Promise<void> {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: req.currentUser },
        select: {
          id: true,
          correo: true,
          contrasena: false,
          cedula: true,
          nombre: true,
          apellido: true,
          estado: true,
          cargo: true,
        },
      });

      //se verifica si se encontró al usuario
      if (!usuario) throw new Error('usuario not found');

      //se verifica el estado del usuario
      if (!usuario.estado) throw new Error('Usuario not avaible');

      res.status(200).json(usuario);
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        'Profile (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
  }

  public async LogIn(req: Request, res: Response): Promise<void> {
    try {
      let { correo, contrasena } = req.body;

      const usuario = await prisma.usuario.findUnique({
        where: { correo: correo },
      });

      //se verifica si el correo de entrada está vacio
      if (correo == null) throw new Error('correo Undefined');

      //se verifica si el correo no existe
      if (usuario == null) throw new Error('correo doesnt exist');

      //se verifica el estado del usuario
      if (!usuario.estado) throw new Error('Usuario not avaible');

      //se valida la contraseña ingresada
      const contrasenaValidacion = await AuthControllers.validatePassword(
        contrasena,
        usuario.contrasena,
      );

      //se verifica si la contraseña ingresada es invalida
      if (!contrasenaValidacion) {
        throw new Error('contraseña invalida');
      } else {
        const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({ auth: true, token: token });
      }
    } catch (error) {
      let Error: object = await errorHandlerObject.ErrorHandler(
        error,
        'LogIn (Controller)',
        true,
      );
      res.status(500).json(Error);
    }
  }

  static async encryptPassword(password: any): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async validatePassword(password: any, Data: any): Promise<any> {
    return bcrypt.compare(password, Data);
  }
}

const authControllers = new AuthControllers();
export default authControllers;
