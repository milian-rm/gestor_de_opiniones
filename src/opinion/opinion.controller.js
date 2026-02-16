'use strict';

import Opinion from './opinion.model.js';

// Obtener todas las opiniones con paginación y datos del autor
export const getOpinions = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const filter = { isActive: true };

        const opinions = await Opinion.find(filter)
            // Traemos el nombre y el apellido del modelo User referenciado en 'author'
            .populate('author', 'UserName UserSurname')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ opinionDate: -1 });

        const total = await Opinion.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: opinions,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las opiniones',
            error: error.message,
        });
    }
};

// Obtener Opinión por ID
export const getOpinionById = async (req, res) => {
    try {
        const { id } = req.params;
        const opinion = await Opinion.findById(id).populate('author', 'UserName UserSurname UserEmail');

        if (!opinion) {
            return res.status(404).json({
                success: false,
                message: 'Opinión no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            data: opinion,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la opinión',
            error: error.message,
        });
    }
};

// Crear nueva Opinión
export const createOpinion = async (req, res) => {
    try {
        const opinionData = req.body;

        const opinion = new Opinion(opinionData);
        await opinion.save();

        res.status(201).json({
            success: true,
            message: 'Opinión creada exitosamente',
            data: opinion,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la opinión',
            error: error.message,
        });
    }
};

// Actualizar Opinión (Solo título, cuerpo, categoría o rating)
export const updateOpinion = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        const opinion = await Opinion.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!opinion) {
            return res.status(404).json({
                success: false,
                message: 'Opinión no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Opinión actualizada exitosamente',
            data: opinion,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la opinión',
            error: error.message,
        });
    }
};

// Borrado lógico de Opinión
export const changeOpinionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body; // Se espera un booleano en el body

        const opinion = await Opinion.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!opinion) {
            return res.status(404).json({
                success: false,
                message: 'Opinión no encontrada',
            });
        }

        const action = isActive ? 'activada' : 'desactivada';

        res.status(200).json({
            success: true,
            message: `Opinión ${action} exitosamente`,
            data: opinion,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado de la opinión',
            error: error.message,
        });
    }
};