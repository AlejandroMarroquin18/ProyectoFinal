import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icono from "../components/icon.png";

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
  const [resultados, setResultados] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ padding: "5%" }}>
      <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        gap: "1rem",
        marginBottom: "2rem", // Espacio entre el encabezado y el cardStyle
        flexWrap: "wrap", // Permite que los elementos salten de línea en pantallas pequeñas
      }}
      >
      {/* Icono y texto Asistente Virtual */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src={Icono}
          alt="Icono"
          style={{
            width: "3rem",
            height: "3rem",
          }}
        />
        <h1
          style={{
            fontSize: "2rem",
            margin: "0",
            whiteSpace: "nowrap", // Evita que el texto se corte en pantallas pequeñas
          }}
        >
          ASISTENTE VIRTUAL
        </h1>
      </div>

        {/* Bienvenido Usuario y botón Cerrar Sesión */}
        <div
        style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        }}
        >
        <span
          style={{
            fontSize: "1rem",
            whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
          }}
        >
          Bienvenido usuario
        </span>
        <button
          onClick={() => navigate("/")}
          style={{
          padding: "0.5em 1em",
          backgroundColor: "#007bff",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "1rem",
          }}
        >
          Cerrar sesión
        </button>
      </div>
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

      {showBusqueda && (
        <div style={cardStyle}>
          <div className="content" style={{ display: "flex", gap: "4%" }}>
            <div style={{ flex: "1" }}>
              <Busqueda setResultados={setResultados} />
            </div>

            <div
              style={{
                flex: "2",
                borderLeft: "2px solid #ccc",
                paddingLeft: "1rem",
              }}
            >
              <h2>Resultados</h2>
              <p>Las mejores opciones según tus criterios:</p>
              <p>{resultados}</p>
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

function Busqueda({ setResultados }) {
  const [maxBudget, setMaxBudget] = useState("");
  const [category, setCategory] = useState("");
  const [preferredBrand, setPreferredBrand] = useState("");

  const handleBuscar = async () => {
    if (!maxBudget || !category) {
      alert("Por favor, ingresa el presupuesto y la categoría.");
      return;
    }

    const requestBody = {
      maxBudget: Number(maxBudget),
      category,
      preferredBrand,
    };

    try {
      const response = await fetch("http://localhost:3000/recommendation/recommend-pc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error al comunicarse con el servidor.");
      }

      const data = await response.json();
      setResultados(data.message); // Actualizar el estado con el mensaje del backend
    } catch (error) {
      console.error("Error:", error);
      setResultados("Hubo un problema al procesar la solicitud.");
    }
  };

  return (
    <div className="busqueda">
      <h2>Criterios de búsqueda</h2>
      <p style={{ marginBottom: "10px" }}>Define tus preferencias para encontrar la mejor opción</p>
      <input
        type="number"
        placeholder="Presupuesto máximo"
        style={inputStyle}
        value={maxBudget}
        onChange={(e) => setMaxBudget(e.target.value)}
        required
      />
      <select
        style={inputStyle}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>
          Selecciona una categoría
        </option>
        <option value="computadoras">Computadoras y laptops</option>
        <option value="smartphones">Smartphones</option>
        <option value="tablets">Tablets</option>
        <option value="monitores">Monitores</option>
        <option value="accesorios">Accesorios</option>
        <option value="componentes">Componentes de PC</option>
        <option value="gadgets">Gadgets</option>
        <option value="redes">Redes</option>
      </select>
      <input
        type="text"
        placeholder="Marca (opcional)"
        style={inputStyle}
        value={preferredBrand}
        onChange={(e) => setPreferredBrand(e.target.value)}
      />
      <button onClick={handleBuscar} style={buttonStyle}>
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
