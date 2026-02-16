import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateComment = [
    body('text')
        .trim()
        .notEmpty().withMessage('El texto del comentario no puede estar vacío')
        .isLength({ max: 500 }).withMessage('Máximo 500 caracteres'),
    body('author')
        .notEmpty().isMongoId().withMessage('ID de autor no válido'),
    body('opinion')
        .notEmpty().isMongoId().withMessage('ID de opinión no válido'),
    checkValidators
];

export const validateUpdateComment = [
    param('id').isMongoId().withMessage('ID inválido'),
    body('text').trim().notEmpty().withMessage('El texto es requerido'),
    checkValidators
];