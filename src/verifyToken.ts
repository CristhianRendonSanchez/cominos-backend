import { NextFunction } from 'express';
import { Request, Response } from 'express';
import errorHandlerObject from './modules/error/controllers/error.class';

const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      res.status(401).json({
        auth: false,
        message: 'No Token Provided',
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    req.currentUser = decoded.id;
    console.log(req);
    next();
  } catch (error) {
    let Error: object = await errorHandlerObject.ErrorHandler(
      error,
      'verifyToken (Controller)',
      true,
    );
    res.status(500).json(Error);
  }
}

module.exports = verifyToken;
