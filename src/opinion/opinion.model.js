'use strict';

import mongoose from 'mongoose';

const opinionSchema = new mongoose.Schema({
    opinionTitle: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxlength: [100, 'El título no puede exceder los 100 caracteres']
    },
    opinionCategory: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: {
            values: ['Sugerencia', 'Queja', 'Elogio', 'General'],
            message: '{VALUE} no es una categoría válida'
        }
    },
    opinionBody: {
        type: String,
        required: [true, 'El cuerpo de la opinión es obligatorio'],
        trim: true,
        maxlength: [1000, 'La opinión no puede exceder los 1000 caracteres']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Nombre del modelo al que hace referencia
        required: [true, 'El autor es obligatorio']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    opinionDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Índice para mejorar la velocidad de búsqueda por autor
opinionSchema.index({ author: 1 });

export default mongoose.model('Opinion', opinionSchema);