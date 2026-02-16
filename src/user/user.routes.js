import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    changeUserStatus,
} from './user.controller.js';
import {
    validateCreateUser,
    validateUpdateUser,
    validateGetUserById
} from '../../middlewares/user-validator.js'; 


const router = Router();

// --- RUTAS GET ---
// Obtener todos los usuarios (con paginación y filtro de isActive)
router.get('/', getUsers);
// Obtener un usuario específico por ID
router.get('/:id', getUserById);

// --- RUTAS POST ---
// Crear un nuevo usuario
router.post('/', createUser);

// --- RUTAS PUT ---
// Actualizar datos de un usuario
router.put('/:id', updateUser);


// --- RUTAS PATCH ---
// Activar o desactivar un usuario (SoftDelete)
router.patch('/status/:id', changeUserStatus);

export default router;