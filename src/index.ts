import express, { Application } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import errorRoutes from './modules/error/routes/error.routes';
import productoRoutes from './modules/producto/routes/producto.routes';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.routes();
    this.settings();
  }
  settings() {
    dotenv.config({ path: join(__dirname, '../.env') });
    this.app.set('port', process.env.PORT || 4000);
    console.log(process.env.PORT);
  }
  routes() {
    this.app.use('/Api/Error', errorRoutes);
    this.app.use('/Api/Producto', productoRoutes);
  }

  start() {
    const Puerto = this.app.get('port');
    this.app.listen(Puerto, () => {
      console.log(`Servidor iniciado en http://localhost:${Puerto}`);
    });
  }
}

// Ejecución del servidor:
const server = new Server();
server.start();
