/**
 * @file index.jsx
 * @description Archivo de entrada principal de la aplicación. Este archivo renderiza el componente `App` 
 * dentro del contenedor de la aplicación en el DOM utilizando `StrictMode` para activar advertencias y 
 * comprobaciones adicionales en el desarrollo.
 * @requires react - Necesario para crear y renderizar el árbol de componentes de la aplicación.
 * @requires react-dom/client - Necesario para interactuar con el DOM y renderizar la aplicación.
 * @requires ./styles/index.css - Archivo de estilos globales que se aplica a toda la aplicación.
 * @requires ./App.jsx - El componente principal de la aplicación que contiene la lógica y vista principal.
 */

import 'regenerator-runtime/runtime';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../config/i18n.js"; 
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
