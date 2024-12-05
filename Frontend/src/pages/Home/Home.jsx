import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icono from "../../assets/images/icon.png";
import { auth } from "../../../config/firebaseConfigF";
import { signOut } from "firebase/auth";
import Asistente from "./Asistente";
import Busqueda from "./Busqueda";
import Historial from "./Historial";
import {
  buttonStyle,
  cardStyle,
  productCardStyle,
  productImageStyle,
  productInfoStyle,
  productLinkStyle,
} from "./styles";

/**
 * Componente funcional Home
 * @description Este componente es la página de inicio del asistente virtual, donde los usuarios pueden buscar productos, 
 * ver su historial de búsquedas previas o cerrar sesión. Se gestionan dos vistas: Búsqueda y Historial.
 * @returns {JSX.Element} - El JSX que representa el interfaz de usuario del Home, incluyendo los botones para alternar entre 
 * la búsqueda y el historial, los resultados de la búsqueda, y la opción para cerrar sesión.
 */
function Home() {
  const [showBusqueda, setShowBusqueda] = useState(true);
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  const CerrarSesion = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={{ padding: "5%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src={Icono}
            alt="Icono"
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />
          <h1 style={{ fontSize: "2rem", margin: "0", whiteSpace: "nowrap" }}>
            SmartSetup
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "1rem", whiteSpace: "nowrap" }}>
            Bienvenido usuario
          </span>
          <button onClick={CerrarSesion} style={buttonStyle}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {resultados.length > 0 ? (
                  resultados.map((producto, index) => (
                    <a
                      key={index}
                      href={producto.enlaceCompra}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={productCardStyle}
                    >
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={productImageStyle}
                      />
                      <div style={productInfoStyle}>
                        <h3>{producto.nombre}</h3>
                        <p>
                          <strong>Precio:</strong> ${producto.precio}
                        </p>
                        <p>
                          <strong>Tienda:</strong> {producto.tienda}
                        </p>
                        <p style={productLinkStyle}>Ver producto</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <p>No se han encontrado productos.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showBusqueda && (
        <div style={cardStyle}>
          <p>Espacio reservado para la IA</p>
          <h2>Asistente Virtual</h2>
          <Asistente />
        </div>
      )}

      {!showBusqueda && (
        <div style={cardStyle}>
          <Historial />
        </div>
      )}
    </div>
  );
}

export default Home;
