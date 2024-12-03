/**
 * @file Historial.jsx
 * @description Componente para mostrar un historial de búsquedas previas. Permite al usuario hacer clic en un ítem del historial 
 * para realizar una acción con la búsqueda seleccionada.
 */

import React from "react";

/**
 * Componente funcional Historial
 * @description Este componente muestra un historial de búsquedas previas. Los ítems del historial son clicables y 
 * al hacer clic en uno, se muestra una alerta con el nombre de la búsqueda seleccionada. 
 * El historial se mantiene como un arreglo de cadenas en el estado local.
 * @returns {JSX.Element} - El JSX que representa la lista de búsquedas previas y permite la interacción con cada ítem.
 */
function Historial() {
  const historial = ["Búsqueda 1", "Búsqueda 2", "Búsqueda 3"];

  const handleSeleccionarBusqueda = (busqueda) => {
    alert(`Seleccionaste: ${busqueda}`);
  };

  return (
    <div className="historial" style={{ textAlign: "center" }}>
      <h2>Historial</h2>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {historial.map((item, index) => (
          <li
            key={index}
            onClick={() => handleSeleccionarBusqueda(item)}
            style={{
              padding: "0.5rem",
              cursor: "pointer",
              borderBottom: "1px solid #ccc",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;