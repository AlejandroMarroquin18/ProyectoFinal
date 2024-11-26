import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const buttonStyle = {
  padding: "0.5em 1em",
  width: "100%",
  backgroundColor: "#007bff",
  color: "#ffffff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1em",
};

const cardStyle = {
  padding: "2rem",
  borderRadius: "8px",
  backgroundColor: "#fff",
  marginBottom: "2rem",
  border: "0.5px solid #007bff",
};

function Home() {
  const [showBusqueda, setShowBusqueda] = useState(true);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h1
        style={{
          fontSize: "2rem",
          position: "absolute",
          top: "2rem",
          left: "2rem",
        }}
      >
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
            padding: "0.5em 1em",
            width: "50%",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1em",
          }}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Card de los botones de Búsqueda e Historial */}
      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <button onClick={() => setShowBusqueda(true)} style={buttonStyle}>
            Búsqueda
          </button>
          <button onClick={() => setShowBusqueda(false)} style={buttonStyle}>
            Historial
          </button>
        </div>
      </div>

      {/* Card de los criterios de búsqueda */}
      {showBusqueda && (
        <div style={cardStyle}>
          <div className="content" style={{ display: "flex", gap: "2rem" }}>
            <div style={{ width: "50%" }}>
              <Busqueda />
            </div>

            <div
              style={{
                width: "45%",
                borderLeft: "2px solid #ccc",
                paddingLeft: "2rem",
              }}
            >
              <h2>Resultados</h2>
              <p>Las mejores opciones según tus criterios</p>
              {/* Aquí irían los resultados */}
            </div>
          </div>
        </div>
      )}

      {/* Card del Asistente Virtual*/}
      {showBusqueda && (
        <div style={cardStyle}>
          <h2>Asistente Virtual</h2>
          <p>Espacio reservado para la IA</p>
        </div>
      )}

      {/* Card para el Historial */}
      {!showBusqueda && (
        <div style={cardStyle}>
          <Historial />
        </div>
      )}
    </div>
  );
}

function Busqueda() {
  const handleBuscar = () => {
    alert("Resultados de ejemplo generados.");
  };

  return (
    <div className="busqueda">
      <h2>Criterios de búsqueda</h2>
      <p>Define tus preferencias para encontrar la mejor opción</p>
      <input type="text" placeholder="Presupuesto máximo" style={inputStyle} />
      <input type="text" placeholder="Categoría" style={inputStyle} />
      <input type="text" placeholder="Marca" style={inputStyle} />
      <button
        onClick={handleBuscar}
        style={{
          padding: "0.5em 1em",
          width: "50%",
          backgroundColor: "#007bff",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "1em",
        }}
      >
        Buscar
      </button>
    </div>
  );
}

const inputStyle = {
  marginBottom: "1rem",
  padding: "0.75rem",
  width: "100%",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

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

export default Home;
