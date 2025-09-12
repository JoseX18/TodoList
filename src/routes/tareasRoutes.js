import express from 'express';  // Funciona porque Express usa module.exports como export default
const app = express();
const router = express.Router();

import { getTareas, getTareaById, createTarea, updateTarea, deleteTarea } from '../controllers/tareasController.js';

import { validarTareaId, validarDatosTarea } from '../middleware/validators.js';

//Ruta al /api/tareas
router.get('/', getTareas);

//Ruta a /api/tareas/:id
router.get('/:id', validarTareaId, getTareaById);

//Ruta a /api/tareas
router.post('/', validarDatosTarea, createTarea);

//Ruta PUT /api/tareas/:id
router.put('/:id', validarTareaId, updateTarea);

//Ruta DELETE /api/tareas/:id
router.delete('/:id', validarTareaId, deleteTarea);

export default router;