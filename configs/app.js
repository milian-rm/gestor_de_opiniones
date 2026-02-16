'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { corsOptions } from './cors-configuration.js'; 
import { dbConnection } from './db.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';

import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/user/user.routes.js';
import opinionRoutes from '../src/opinion/opinion.routes.js';
import commentRoutes from '../src/comment/comment.routes.js';

const BASE_URL = '/opinionSystem/v1';

const middleware = (app) => {
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.use(`${BASE_URL}/auth`, authRoutes);       
    app.use(`${BASE_URL}/users`, userRoutes);
    app.use(`${BASE_URL}/opinions`, opinionRoutes);
    app.use(`${BASE_URL}/comments`, commentRoutes);
}

const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        await dbConnection();
        middleware(app);
        routes(app);
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

export { initServer };