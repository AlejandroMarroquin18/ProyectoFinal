/**
 * @file routes.js
 * @description Configuración del enrutador principal de la aplicación, que agrupa todas las rutas relacionadas con los diferentes módulos.
 * @requires express Framework web para definir y manejar rutas.
 * @requires ./recommendationRoutes Rutas relacionadas con las recomendaciones personalizadas utilizando Gemini.
 * @requires ./listRoutes Rutas relacionadas con la gestión de listas.
 * @requires ./chatRoutes Rutas relacionadas con la gestión de chats.
 * @requires ./authRoutes Rutas relacionadas con la autenticación de usuarios.
 */

const express = require('express');

const recommendationRoutes = require('./recommendationRoutes');
const listRoutes = require('./listRoutes');
const chatRoutes = require('./chatRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

/**
 * Agrupa las rutas relacionadas con los chats bajo el prefijo `/chat`.
 * @name /chat
 * @function
 * @memberof module:indexRoutes
 */
router.use('/chat', chatRoutes);

/**
 * Agrupa las rutas relacionadas con las listas bajo el prefijo `/list`.
 * @name /list
 * @function
 * @memberof module:indexRoutes
 */
router.use('/list', listRoutes);

/**
 * Agrupa las rutas relacionadas con las recomendaciones de PCs bajo el prefijo `/gemini`.
 * @name /recommendation
 * @function
 * @memberof module:indexRoutes
 */
router.use('/recommendation', recommendationRoutes);

/**
 * Agrupa las rutas relacionadas con la autenticación bajo el prefijo `/auth`.
 * @name /auth
 * @function
 * @memberof module:indexRoutes
 */
router.use('/auth', authRoutes);

module.exports = router;
