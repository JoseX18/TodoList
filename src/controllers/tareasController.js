//Importar las funciones del modelo de datos
import { obtenerTodasLasTareas, obtenerTareaPorId, crearTarea, actualizarTarea, eliminarTarea } from '../data/tareasDataMongoDB.js';

export const getTareas = async (req, res) => {
    try {
        const { completada } = req.query;
        let tareas = await obtenerTodasLasTareas();

        if (completada !== undefined) {
            const estaCompletada = completada === 'true';
            tareas = tareas.filter(t => t.completada === estaCompletada);
        }

        res.json({
            count: tareas.length,
            tareas: tareas
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

//Controlador para obtener una tarea por su ID
export const getTareaById = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await obtenerTareaPorId(id);

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json(tarea);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la tarea' + error });
    }
};

//Controlador para crear una nueva tarea
export const createTarea = async (req, res) => {
    try {
        const { titulo, descripcion, completada } = req.body;
        const nuevaTarea = await crearTarea({
            titulo: titulo.trim(),
            descripcion: descripcion ? descripcion.trim() : '',
            completada: completada || false
        });

        res.status(201).json({
            message: 'Tarea creada con exito',
            tarea: nuevaTarea
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' + error });
    }
}

export const updateTarea = async (req, res) => {
    try {
        const { titulo, descripcion, completada } = req.body;

        const tareaActualizada = await actualizarTarea(req.params.id, {
            titulo: titulo.trim(),
            descripcion: descripcion ? descripcion.trim() : '',
            completada: completada !== undefined ? completada : false
        });

        if (!tareaActualizada) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({
            message: 'Tarea actualizada con exito',
            tarea: tareaActualizada
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' + error });
    }
}

export const deleteTarea = async (req, res) => {
    try {
        const tareaEliminada = await eliminarTarea(req.params.id);

        if (!tareaEliminada) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({
            message: 'Tarea eliminada con exito',
            tarea: tareaEliminada
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' + error });
    }
}