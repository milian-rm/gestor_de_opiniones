'use strict';

import User from '../user/user.model.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// --- REGISTER ---
export const register = async (req, res) => {
    try {
        const data = req.body;

        // Encriptar la contraseña antes de guardar
        data.password = await argon2.hash(data.password);

        const user = new User(data);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            user: { UserName: user.UserName, UserEmail: user.UserEmail }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar', error: error.message });
    }
};

// --- LOGIN ---
export const login = async (req, res) => {
    try {
        const { UserEmail, password } = req.body;

        // 1. Verificar si el usuario existe
        const user = await User.findOne({ UserEmail, isActive: true });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Correo no encontrado' });
        }

        // 2. Verificar contraseña
        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // 3. Generar JWT (Token de sesión)
        const token = jwt.sign(
            { uid: user._id, email: user.UserEmail },
            process.env.SECRET_KEY, // Debe estar en tu .env
            { expiresIn: '3h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            token,
            user: { UserName: user.UserName, UserEmail: user.UserEmail }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el login', error: error.message });
    }
};