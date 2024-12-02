/**
 * @file geminiConfig.js
 * @description Configuración e inicialización del LLM Gemini.
 * @requires @google/generative-ai SDK para interactuar con la API de Google Generative AI.
 * @requires dotenv Configuración de variables de entorno.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

module.exports = model;