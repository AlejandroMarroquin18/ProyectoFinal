/**
 * @file index.js
 * @description Archivo principal para inicializar el servidor de Express y configurar middlewares básicos.
 * @requires express Framework web para crear el servidor y manejar rutas.
 * @requires cors Middleware para habilitar CORS.
 * @requires dotenv Para gestionar variables de entorno.
 * @requires ./routes/routes Rutas principales de la aplicación.
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = 3000;

// Cors
app.use(cors({
    origin: "https://test-smartsetup.vercel.app/",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});