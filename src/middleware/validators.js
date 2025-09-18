import mongoose from 'mongoose';

export const validarTareaId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    next();
};

export const validarDatosTarea = (req, res, next) => {
    const { titulo } = req.body;

    if (req.method === "POST" || req.method === "PUT") {
        if (!titulo || titulo.trim() === '') {
            return res.status(400).json({ error: "el titulo es obligatorio" })
        }
    }

    next();
};

