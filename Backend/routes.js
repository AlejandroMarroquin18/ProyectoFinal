/**
 * @file routes.js
 * @description Configuración del enrutador principal de la aplicación, que agrupa todas las rutas relacionadas con los diferentes módulos.
 * @requires express Framework web para definir y manejar rutas.
 * @requires ./modules/auth/authRoutes Rutas relacionadas con la autenticación de usuarios.
 * @requires ./modules/chat/chatRoutes Rutas relacionadas con la gestión de chats.
 * @requires ./modules/list/listRoutes Rutas relacionadas con la gestión de listas.
 * @requires ./modules/recommendation/recommendationRoutes Rutas relacionadas con las recomendaciones personalizadas utilizando Gemini.
 * @requires ./modules/speech/speechRoutes Rutas relacionadas con la gestión de audios.
 */

const express = require('express');

const authRoutes = require('./modules/auth/authRoutes');
const chatRoutes = require('./modules/chat/chatRoutes');
const listRoutes = require('./modules/list/listRoutes');
const recommendationRoutes = require('./modules/recommendation/recommendationRoutes');
const speechRoutes = require('./modules/speech/speechRoutes');

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
 * Agrupa las rutas relacionadas con los chats bajo el prefijo `/speech`.
 * @name /speech
 * @function
 * @memberof module:indexRoutes
 */
router.use('/speech', speechRoutes);

/**
 * Agrupa las rutas relacionadas con la autenticación bajo el prefijo `/auth`.
 * @name /auth
 * @function
 * @memberof module:indexRoutes
 */
router.use('/auth', authRoutes);

module.exports = router;
