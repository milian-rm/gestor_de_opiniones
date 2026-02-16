import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validaciones para crear una opinión
export const validateCreateOpinion = [
    body('opinionTitle')
        .trim()
        .notEmpty()
        .withMessage('El título de la opinión es requerido')
        .isLength({ max: 100 })
        .withMessage('El título no puede exceder los 100 caracteres'),
    body('opinionCategory')
        .notEmpty()
        .withMessage('La categoría es requerida')
        .isIn(['Sugerencia', 'Queja', 'Elogio', 'General'])
        .withMessage('Categoría no válida. Use: Sugerencia, Queja, Elogio o General'),
    body('opinionBody')
        .trim()
        .notEmpty()
        .withMessage('El cuerpo de la opinión es requerido')
        .isLength({ max: 1000 })
        .withMessage('El cuerpo no puede exceder los 1000 caracteres'),
    body('author')
        .notEmpty()
        .withMessage('El autor (ID de usuario) es requerido')
        .isMongoId()
        .withMessage('El ID del autor no es un ObjectId válido'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('La calificación debe ser un número entero entre 1 y 5'),
    checkValidators,
];

// Validaciones para actualizar una opinión
export const validateUpdateOpinion = [
    param('id')
        .isMongoId()
        .withMessage('ID de opinión no válido'),
    body('opinionTitle')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('El título no puede exceder los 100 caracteres'),
    body('opinionCategory')
        .optional()
        .isIn(['Sugerencia', 'Queja', 'Elogio', 'General'])
        .withMessage('Categoría no válida'),
    body('opinionBody')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('El cuerpo no puede exceder los 1000 caracteres'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('La calificación debe estar entre 1 y 5'),
    checkValidators,
];

// Validación para cambiar el estado de la opinión
export const validateChangeOpinionStatus = [
    param('id')
        .isMongoId()
        .withMessage('ID de opinión no válido'),
    body('isActive')
        .notEmpty()
        .withMessage('El estado isActive es requerido')
        .isBoolean()
        .withMessage('isActive debe ser un valor booleano (true/false)'),
    checkValidators,
];

// Validación para obtener por ID
export const validateGetOpinionById = [
    param('id')
        .isMongoId()
        .withMessage('ID de opinión no válido'),
    checkValidators,
];