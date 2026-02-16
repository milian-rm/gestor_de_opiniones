import { Router } from 'express';
import { 
    createComment, 
    getCommentsByOpinion, 
    updateComment, 
    deleteComment 
} from './comment.controller.js';
import { 
    validateCreateComment, 
    validateUpdateComment 
} from '../../middlewares/comment-validator.js';

const router = Router();

// Publicar un comentario
router.post('/', validateCreateComment, createComment);

// Ver comentarios de una opinión específica
router.get('/opinion/:opinionId', getCommentsByOpinion);

// Editar comentario
router.put('/:id', validateUpdateComment, updateComment);

// Eliminar comentario
router.delete('/:id', deleteComment);

export default router;