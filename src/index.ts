import express, { Application } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import errorRoutes from './modules/error/routes/error.routes';
import productoRoutes from './modules/producto/routes/producto.routes';
import clienteRoutes from './modules/cliente/routes/cliente.routes';
import usuarioRoutes from './modules/usuario/routes/usuario.routes';
import authRoutes from './modules/auth/routes/auth.routes';
const bodyParser = require('body-parser');
const cors = require('cors');

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.routes();
    this.settings();
  }
  settings() {
    dotenv.config({ path: join(__dirname, '../.env') });
    this.app.set('port', process.env.PORT || 4000);
    console.log(process.env.PORT);
  }
  routes() {
    this.app.use(bodyParser.json()) // for parsing application/json
    this.app.use(bodyParser.urlencoded({ extended: true }))

    this.app.use('/Api/Error', errorRoutes);
    this.app.use('/Api/Producto', productoRoutes);
    this.app.use('/Api/Cliente', clienteRoutes);
    this.app.use('/Api/Usuario', usuarioRoutes);
    this.app.use('/Api/Auth', authRoutes);
  }

  start() {
    const Puerto = process.env.PORT || 4000;
    this.app.listen(Puerto, () => {
      console.log(`Servidor iniciado en http://localhost:${Puerto}`);
    });
  }
}

// Ejecución del servidor:
const server = new Server();
server.start();
