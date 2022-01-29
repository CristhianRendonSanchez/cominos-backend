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

      if (correo == null) throw new Error('correo Undefined');

      if (
        (await prisma.usuario.findUnique({ where: { correo: correo } })) != null
      )
        throw new Error('correo is already exists');

      contrasena = await AuthControllers.encryptPassword(contrasena);

      const usuario = await prisma.usuario.create({
        data: {
          correo: correo,
          contrasena: contrasena,
          cedula: cedula,
          nombre: nombre,
          apellido: apellido,
          cargo: cargo,
        },
      });

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
          cargo: true,
        },
      });

      if (!usuario) {
        res.status(404).send('usuario not found');
      }

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

      if (correo == null) throw new Error('correo Undefined');

      const usuario = await prisma.usuario.findUnique({
        where: { correo: correo },
      });

      if (usuario == null) throw new Error('correo doesnt exist');

      const contrasenaValidacion = await AuthControllers.validatePassword(
        contrasena,
        usuario.contrasena,
      );

      if (!contrasenaValidacion) {
        res.status(401).json({ auth: false, token: null });
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
