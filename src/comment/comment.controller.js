'use strict';

import Comment from './comment.model.js';

// Crear comentario
export const createComment = async (req, res) => {
    try {
        const data = req.body;
        const comment = new Comment(data);
        await comment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario publicado exitosamente',
            comment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al comentar', error: error.message });
    }
};

// Obtener comentarios por Opinión (Para ver el "hilo" de una opinión)
export const getCommentsByOpinion = async (req, res) => {
    try {
        const { opinionId } = req.params;
        const comments = await Comment.find({ opinion: opinionId, isActive: true })
            .populate('author', 'UserName UserSurname')
            .sort({ createdAt: 1 }); // Orden cronológico (del más viejo al más nuevo)

        res.status(200).json({ success: true, total: comments.length, comments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar comentario
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true });

        if (!comment) return res.status(404).json({ success: false, message: 'No se encontró el comentario' });

        res.status(200).json({ success: true, message: 'Comentario actualizado', comment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar (Soft Delete)
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndUpdate(id, { isActive: false });
        res.status(200).json({ success: true, message: 'Comentario eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};