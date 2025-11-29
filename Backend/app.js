import 'dotenv/config.js';
import {Servidor} from './src/servidor/servidor.js';

const app = new Servidor();

app.listen();