/**
 * @file HistorialUI.jsx
 * @description Componente que se encarga de mostrar la interfaz gráfica del historial de búsquedas del usuario.
 * Este componente recibe los datos del historial y permite al usuario seleccionar una búsqueda para ver los detalles.
 */

import React from 'react';
import styles from './Historial.module.css';  // Estilos específicos de Historial

/**
 * Componente funcional HistorialUI
 * @description Este componente muestra la interfaz del historial de búsquedas del usuario. Recibe un array 
 * de búsquedas y las muestra como una lista. Cuando el usuario hace clic en una búsqueda, ejecuta la función 
 * `onSeleccionarBusqueda` pasando la búsqueda seleccionada.
 * @param {Array} historial - Array de cadenas de texto que representan las búsquedas previas realizadas por el usuario.
 * @param {Function} onSeleccionarBusqueda - Función que se ejecuta al hacer clic en una búsqueda de la lista.
 * @returns {JSX.Element} - El JSX que representa la interfaz de usuario del historial de búsquedas.
 */
function HistorialUI({ historial, onSeleccionarBusqueda }) {
  return (
    <div className={styles.historialContainer}>
      <h1>Historial</h1>
      <ul>
        {historial.map((busqueda, index) => (
          <li key={index} onClick={() => onSeleccionarBusqueda(busqueda)} className={styles.item}>
            {busqueda}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistorialUI;