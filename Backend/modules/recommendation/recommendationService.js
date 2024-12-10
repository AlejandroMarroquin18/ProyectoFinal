/**
 * @file recommendationService.js
 * @description Servicio para generar recomendaciones personalizadas de PCs utilizando un modelo generativo de Gemini.
 * @requires ../../config/geminiConfig Configuración del LLM Gemini.
 */

const model = require('../../config/geminiConfig');

/**
 * Genera una recomendación personalizada de un PC basado en las especificaciones del usuario.
 * @function generateRecommendation
 * @param {number} maxBudget - Presupuesto máximo del usuario en USD.
 * @param {string} category - Categoría deseada (por ejemplo, "gaming", "oficina").
 * @param {string} [preferredBrand] - Marca preferida del usuario (opcional).
 * @returns {Promise<string>} Respuesta generada por el modelo, con una recomendación clara y profesional.
 */
const generateRecommendation = async (message) => {
  console.log("GENERATE RECOMMENDATION")
  const prompt = `
  Toma el rol de un experto en computadores. Tu objetivo es ayudar a los usuarios a encontrar un PC adecuado según las siguientes especificaciones:

  - El presupuesto debe estar en COP (PESOS COLOMBIANOS). Ninguna otra moneda es aceptada.
  - NO OBLIGUES SIEMPRE A DAR PRECIOS. Si requiere solo un consejo AYÚDALO CON UN CONSEJO.
  - Si no te ingresa un valor, pero te pide una asesoría con un precio, RESPONDE CON PRECIOS.
  - Responde de manera clara y profesional de máximo 150 palabras. 
  - Si el usuario solicita algo que no esté relacionado con computadoras, responde: "No tengo respuesta a tu petición". ESTO ES MUY IMPORTANTE. 
  - Usa un lenguaje amigable para el usuario.
  - Si es usuario pregunta en TODA LA PREGUNTA en inglés RESPONDE EN INGLÉS. Si solo usa algunas palabras RESPONDE EN ESPAÑOL.

  La solicitud enviada por el usuario es la siguiente:

  "${message}"

  Proporciona una recomendación específica basada en estas necesidades TOMANDO EN CUENTA TODO LO DICHO ANTERIORMENTE. 
  `;

  //console.log('Prompt enviado:', prompt);

  try {
    const result = await model.generateContent(prompt);
    const candidates = result.response?.candidates;

    if (!candidates || candidates.length === 0) {
      console.error('No se encontraron candidatos:', candidates);
      throw new Error('No se encontraron candidatos en la respuesta del modelo.');
    }

    const responseMessage = candidates[0]?.content?.parts?.[0]?.text?.trim();
    return responseMessage || 'Respuesta no generada.';
  } catch (error) {
    console.error('Error al generar la respuesta:', error.message);
    throw new Error('Error al generar la respuesta. Intenta nuevamente más tarde.');
  }
}

module.exports = { generateRecommendation };