import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showBusqueda, setShowBusqueda] = useState(true); // Alternar entre Búsqueda e Historial
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      {/* Título en la esquina superior izquierda */}
      <h1 style={{ fontSize: "2rem", position: "absolute", top: "2rem", left: "2rem" }}>
        ASISTENTE VIRTUAL
      </h1>

      {/* Bienvenido usuario y Cerrar sesión */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ marginRight: "1rem" }}>Bienvenido usuario</span>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.6em 1.2em",
            fontSize: "1em",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Botones de Búsqueda e Historial */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "1rem", // Espacio desde arriba
        }}
      >
        <button
          onClick={() => setShowBusqueda(true)}
          style={{
            padding: "1em 2em",
            fontSize: "1.2em",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Búsqueda
        </button>
        <button
          onClick={() => setShowBusqueda(false)}
          style={{
            padding: "1em 2em",
            fontSize: "1.2em",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Historial
        </button>
      </div>

      {/* Contenido de Búsqueda o Historial */}
      <div className="content" style={{ marginTop: "2rem" }}>
        {showBusqueda ? <Busqueda /> : <Historial />}
      </div>

      {/* Espacio para el asistente virtual */}
      <div className="assistant-placeholder" style={{ marginTop: "3rem" }}>
        <h2>Asistente Virtual</h2>
        <p>Espacio reservado para la IA</p>
      </div>
    </div>
  );
}

function Busqueda() {
  const handleBuscar = () => {
    alert("Resultados de ejemplo generados.");
  };

  return (
    <div className="busqueda">
      <h2>Búsqueda</h2>
      <input type="text" placeholder="Presupuesto máximo" />
      <input type="text" placeholder="Categoría" />
      <input type="text" placeholder="Marca" />
      <button onClick={handleBuscar}>Buscar</button>
    </div>
  );
}

function Historial() {
  const historial = ["Búsqueda 1", "Búsqueda 2", "Búsqueda 3"];

  const handleSeleccionarBusqueda = (busqueda) => {
    alert(`Seleccionaste: ${busqueda}`);
  };

  return (
    <div className="historial">
      <h2>Historial</h2>
      <ul>
        {historial.map((item, index) => (
          <li key={index} onClick={() => handleSeleccionarBusqueda(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
