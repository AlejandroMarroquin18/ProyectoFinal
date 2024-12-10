/**
 * @file api.js
 * @description Función para manejar peticiones HTTP a un servidor backend. 
 * Esta función se encarga de realizar solicitudes GET, POST, PUT y DELETE, con soporte para autenticación mediante tokens Bearer.
 * La función centraliza la lógica de manejo de peticiones y se utiliza en el frontend para interactuar con el backend de la aplicación.
 */

//const API_URL = "http://localhost:3000"
//const API_URL = "https://smartsetup-b69u.onrender.com";

/**
 * Función que maneja las solicitudes HTTP al backend.
 * @function request
 * @param {string} endpoint - La ruta del endpoint a la que se realizará la solicitud.
 * @param {string} method - El método HTTP a utilizar (GET, POST, PUT, DELETE).
 * @param {object|null} [body=null] - El cuerpo de la solicitud (solo necesario para POST, PUT).
 * @param {string|null} [token=null] - El token de autorización (si es necesario).
 * @returns {Promise<object>} - La respuesta del servidor en formato JSON.
 */
const request = async (endpoint, method, body = null, token = null) => {
  const headers = {};

  const isFormData = body instanceof FormData;

  if (!isFormData) { headers['Content-Type'] = 'application/json'; }

  if (token) { headers['Authorization'] = `Bearer ${token}`; }

  const config = { method, headers, };
  if (body) { config.body = isFormData ? body : JSON.stringify(body); }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
    return await response;
  } catch (error) {
    console.error("Error during request:", error);
    throw error;  
  }
};

export default request;