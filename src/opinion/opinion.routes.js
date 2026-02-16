import { Router } from 'express';
import {
    getOpinions,
    getOpinionById,
    createOpinion,
    updateOpinion,
    changeOpinionStatus,
} from './opinion.controller.js';
import {
    validateCreateOpinion,
    validateUpdateOpinion,
    validateGetOpinionById,
    validateChangeOpinionStatus
} from '../../middlewares/opinion-validator.js'; 

const router = Router();

// --- RUTAS GET ---
// Obtener todas las opiniones (Paginadas y con populate de autor)
router.get('/', getOpinions);

// Obtener una opinión específica por su ID
router.get('/:id', validateGetOpinionById, getOpinionById);

// --- RUTAS POST ---
// Crear una nueva opinión
router.post('/', validateCreateOpinion, createOpinion);

// --- RUTAS PUT ---
// Actualizar los datos de una opinión existente
router.put('/:id', validateUpdateOpinion, updateOpinion);

// --- RUTAS PATCH ---
// Cambio de estado (Activar/Desactivar - Soft Delete)
router.patch('/status/:id', validateChangeOpinionStatus, changeOpinionStatus);

export default router;