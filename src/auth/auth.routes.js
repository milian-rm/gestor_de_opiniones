'use strict';

import { Router } from 'express';
import { login, register } from './auth.controller.js';
import { validateCreateUser } from '../../middlewares/user-validator.js';

const router = Router();

router.post('/register', validateCreateUser, register);
router.post('/login', login);

export default router;