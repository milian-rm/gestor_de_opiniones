'use strict';

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'El texto del comentario es obligatorio'],
        maxlength: [500, 'El comentario no puede exceder los 500 caracteres']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor es obligatorio']
    },
    opinion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opinion',
        required: [true, 'La opinión relacionada es obligatoria']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Comment', commentSchema);