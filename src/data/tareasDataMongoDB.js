import mongoose from 'mongoose';
const mongo = mongoose;


//Definir el esquema de tareas
const tareasSchema = new mongo.Schema({
    // id: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: false },
    completada: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
});

//Crear el modelo de tareas y exportarlo
export const Tareas = mongo.model('tareas', tareasSchema);

//Conexion a MongoDB
export const conectarDB = async () => {
    try {
        let MONGO_CON = process.env.MONGODB_CONEXION;
        console.log('Raw MONGO_CON:', MONGO_CON);  // Debug
        if (process.env.MONGODB_PASSWORD) {
            MONGO_CON = MONGO_CON.replace('<db_password>', process.env.MONGODB_PASSWORD);
        }
        console.log('Processed MONGO_CON:', MONGO_CON);  // Debug
        if (!MONGO_CON) {
            throw new Error('MONGODB_CONEXION is undefined in .env');
        }
        await mongo.connect(MONGO_CON, {
            dbName: process.env.MONGODB_NAME || 'todolistDB'
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
    }
}

//Funcion para obtener todas las tareas
export const obtenerTodasLasTareas = async () => {
    try {
        return await Tareas.find().sort({ fechaCreacion: -1 });
    } catch (error) {
        console.error(`Error al obtener las tareas, ${error}`);
        return [];
    }
}

//Funcion para obtener una tarea por su ID
export const obtenerTareaPorId = async (id) => {
    try {
        return await Tareas.findById(id); //Otra forma de hacerlo si usas el _id de MongoDB
    } catch (error) {
        console.error(`Error al obtener la tarea por ID, ${error}`);
        return null;
    }
}

//Funcion para crear una nueva tarea
export const crearTarea = async (tareaData) => {
    try {
        const nuevaTarea = new Tareas(tareaData);
        return await nuevaTarea.save();
    } catch (error) {
        console.error(`Error al crear la tarea, ${error}`);
    }
}

//Funcion para actualizar una tarea por su ID
export const actualizarTarea = async (id, tareaData) => {
    try {
        // tareaData.fechaActualizacion = Date.now();
        // return await Tareas.findByIdAndUpdate(id, tareaData, { new: true });
        return await Tareas.findByIdAndUpdate(id,
            { ...tareaData, fechaActualizacion: Date.now() },
            { new: true });
    } catch (error) {
        console.error(`Error al actualizar la tarea, ${error}`);
    }
}

//Funcion para eliminar una tarea por su ID
export const eliminarTarea = async (id) => {
    try {
        return await Tareas.findByIdAndDelete(id);
    } catch (error) {
        console.error(`Error al eliminar la tarea, ${error}`);
    }
}

// export default Tareas;