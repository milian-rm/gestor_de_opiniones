'use strict';

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    UserName: {
        required: [true, 'El nombre es requerido'],
        trim: true,
        maxlength: [64, 'El nombre no puede tener más de 100 caracteres'],
        type: String,

    },
    UserSurname: {
        required: [true, 'El apellido es requerido'],
        trim: true,
        maxlength: [64, 'El apellido no puede tener más de 100 caracteres'],
        type: String,
    },
    UserEmail: {
        required: [true, 'El correo es requerido'],
        unique: true,
        trim: true,
        lowercase: true,
        type: String,

    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    UserCreatedAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("User", userSchema);
