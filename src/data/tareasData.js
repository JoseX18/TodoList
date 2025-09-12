//Base de datos en memoria
let tareas = [
    {
        id: 1,
        titulo: "Aprender HTML",
        descripcion: "Estudiar los fundamentos de HTML",
        completada: false,
        fechaCreacion: new Date("2025-09-03"),
        fechaActualizacion: new Date("2025-09-03")
    },
    {
        id: 2,
        titulo: "Aprender CSS",
        descripcion: "Estudiar los fundamentos de CSS",
        completada: false,
        fechaCreacion: new Date("2025-09-03"),
        fechaActualizacion: new Date("2025-09-03")
    },
    {
        id: 3,
        titulo: "Aprender JavaScript",
        descripcion: "Estudiar los fundamentos de JavaScript",
        completada: false,
        fechaCreacion: new Date("2025-09-03"),
        fechaActualizacion: new Date("2025-09-03")
    }
];

let nextId = 4;

//Función para obtener todas las tareas
export const obtenerTodasLasTareas = () => tareas;

//Función para obtener una tarea por su ID
export const obtenerTareaPorId = (id) => tareas.find(t => t.id === id);

//Función para agregar una nueva tarea
export const crearTarea = (tareaData) => {
    const nuevaTarea = {
        id: nextId++,
        ...tareaData,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
    };
    tareas.push(nuevaTarea);
    return nuevaTarea;
}

//Actualizar una tarea existente
export const actualizarTarea = (id, nuevosDatos) => {
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) return null;

    tareas[index] = {
        ...tareas[index],
        ...nuevosDatos,
        fechaActualizacion: new Date()
    };
    return tareas[index];
};

//Eliminar una tarea por su ID
export const eliminarTarea = (id) => {
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) return false;

    return tareas.splice(index, 1)[0];

};

// module.exports = {
//     obtenerTodasLasTareas,
//     obtenerTareaPorId,
//     crearTarea
// };