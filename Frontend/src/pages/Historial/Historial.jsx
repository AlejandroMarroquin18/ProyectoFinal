/**
 * @file Historial.jsx
 * @description Componente que gestiona el historial de búsquedas del usuario.
 * Este componente muestra una lista de las búsquedas previas realizadas por el usuario y 
 * permite navegar a una página con los detalles de la búsqueda seleccionada.
 * Utiliza el componente `HistorialUI` para renderizar la interfaz gráfica.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import HistorialUI from './HistorialUI';  // Importamos la parte visual

/**
 * Componente funcional Historial
 * @description Este componente gestiona el historial de búsquedas previas del usuario.
 * Permite seleccionar una búsqueda del historial y navegar a la página de detalles 
 * de esa búsqueda. Los datos de ejemplo están disponibles como un array estático.
 * @returns {JSX.Element} - El JSX que representa el componente de historial de búsquedas con la lógica aplicada.
 */
function Historial() {
  const navigate = useNavigate();
  const historial = ["Búsqueda 1", "Búsqueda 2", "Búsqueda 3"]; // Datos de ejemplo

  // Lógica para manejar la selección de una búsqueda
  const handleSeleccionarBusqueda = (busqueda) => {
    navigate("/busqueda", { state: { datos: busqueda } });
  };

  return (
    <HistorialUI 
      historial={historial} 
      onSeleccionarBusqueda={handleSeleccionarBusqueda} 
    />
  );
}

export default Historial;