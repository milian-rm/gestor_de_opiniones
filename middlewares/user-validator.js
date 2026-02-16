import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validaciones para crear un usuario
export const validateCreateUser = [
    body('UserName')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ max: 64 })
        .withMessage('El nombre no puede exceder los 64 caracteres'),
    body('UserSurname')
        .trim()
        .notEmpty()
        .withMessage('El apellido es requerido')
        .isLength({ max: 64 })
        .withMessage('El apellido no puede exceder los 64 caracteres'),
    body('UserEmail')
        .trim()
        .notEmpty()
        .withMessage('El correo es requerido')
        .isEmail()
        .withMessage('Debe proporcionar un correo electrónico válido')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    checkValidators,
];

// Validaciones para actualizar un usuario
export const validateUpdateUser = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('UserName')
        .optional()
        .trim()
        .isLength({ max: 64 })
        .withMessage('El nombre no puede exceder los 64 caracteres'),
    body('UserSurame')
        .optional()
        .trim()
        .isLength({ max: 64 })
        .withMessage('El apellido no puede exceder los 64 caracteres'),
    body('UserEmail')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Formato de correo inválido'),
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('La nueva contraseña debe tener al menos 8 caracteres'),
    checkValidators,
];

// Validación para cambiar el estado (PATCH /status/:id)
export const validateChangeUserStatus = [
    param('id')
        .isMongoId()
        .withMessage('ID de usuario no válido'),
    // No necesitamos validar el body si el status se define internamente, 
    // pero si lo envías desde el front:
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive debe ser un valor booleano (true/false)'),
    checkValidators,
];

// Validación para obtener por ID
export const validateGetUserById = [
    param('id')
        .isMongoId()
        .withMessage('ID de usuario no válido'),
    checkValidators,
];