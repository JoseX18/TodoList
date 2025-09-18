import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import tareasRoutes from './routes/tareasRoutes.js';
import dotenv from 'dotenv';

// Obtén __dirname y __filename equivalentes en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

dotenv.config({ path: path.join(__dirname, '.env') });

//Importar conexion a MongoDB
import { conectarDB } from './data/tareasDataMongoDB.js';

//Conectar a la base de datos
conectarDB();



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

// Middlewares globales
app.use(cors());
app.use(express.json());

// Configuración de rutas
app.use('/api/tareas', tareasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});