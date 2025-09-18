
export const validarTareaId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID de tarea inválido' });
    }
    req.params.id = id;
    next();
}

export const validarDatosTarea = (req, res, next) => {
    const { titulo } = req.body;

    if (req.method === "POST" || req.method === "PUT") {
        if (!titulo || titulo.trim() === '') {
            return res.status(400).json({ error: "el titulo es obligatorio" })
        }
    }

    next();
};

