import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icono from "../../assets/images/icon.png";
import { auth } from "../../../config/firebaseConfigF";
import { signOut } from "firebase/auth";
import Asistente from "./Asistente";
import Busqueda from "./Busqueda";
import Historial from "./Historial";
import Comparacion from "./Comparacion"; // Importa el componente de comparación
import { FaCheckCircle } from "react-icons/fa"; // Ícono de check de react-icons
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
 * ver su historial de búsquedas previas o comparar productos. Se gestionan tres vistas: Búsqueda, Historial y Comparación.
 * @returns {JSX.Element} - El JSX que representa el interfaz de usuario del Home, incluyendo los botones para alternar entre 
 * la búsqueda, historial y comparación, los resultados de la búsqueda, y la opción para cerrar sesión.
 */
function Home() {
  const [showBusqueda, setShowBusqueda] = useState(true); // Estado para mostrar la vista de búsqueda
  const [showComparacion, setShowComparacion] = useState(false); // Estado para mostrar la vista de comparación
  const [showHistorial, setShowHistorial] = useState(false); // Estado para mostrar la vista de historial
  const [resultados, setResultados] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]); // Para los productos seleccionados en comparación
  const [productosAñadidos, setProductosAñadidos] = useState([]); // Estado para productos añadidos
  const navigate = useNavigate();

  const CerrarSesion = async () => {
    await signOut(auth);
    navigate("/");
  };

  // Función para alternar entre vistas
  const mostrarBusqueda = () => {
    setShowBusqueda(true);
    setShowComparacion(false);
    setShowHistorial(false);
  };

  const mostrarComparacion = () => {
    setShowBusqueda(false);
    setShowComparacion(true);
    setShowHistorial(false);
  };

  const mostrarHistorial = () => {
    setShowBusqueda(false);
    setShowComparacion(false);
    setShowHistorial(true);
  };

  /**
   * Redirige a la página de producto.
   * @param {string} enlace - El enlace del producto al que redirigir.
   */
  const verProducto = (enlace) => {
    window.open(enlace, "_blank");
  };

  /**
   * Agrega un producto a la lista de productos seleccionados para comparación.
   * @param {Object} producto - El producto a agregar.
   */
  const agregarAComparacion = (producto) => {
    // Verifica si el producto ya está en la lista de comparación para evitar duplicados
    setProductosSeleccionados((prevProductos) => {
      if (!prevProductos.some((p) => p.id === producto.id)) {
        return [...prevProductos, producto];
      }
      return prevProductos;
    });

    // Agrega a los productos añadidos para visualización
    setProductosAñadidos((prevProductos) => {
      if (!prevProductos.some((p) => p.id === producto.id)) {
        return [...prevProductos, producto];
      }
      return prevProductos;
    });
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
          <button onClick={mostrarBusqueda} style={buttonStyle}>
            Búsqueda
          </button>
          <button onClick={mostrarComparacion} style={buttonStyle}>
            Comparación
          </button>
          <button onClick={mostrarHistorial} style={buttonStyle}>
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
                  overflowY: "auto", 
                  maxHeight: "500px", 
                }}
              >
                {resultados.length > 0 ? (
                  resultados.map((producto, index) => (
                    <div
                      key={index}
                      style={productCardStyle}
                      onClick={() => agregarAComparacion(producto)} 
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
                        <span
                          onClick={() => verProducto(producto.enlaceCompra)}
                          style={productLinkStyle}
                        >
                          Ver producto
                        </span>
                        {/* Mostrar el ícono de confirmación si el producto está añadido */}
                        {productosAñadidos.some((p) => p.id === producto.id) && (
                          <FaCheckCircle
                            style={{ color: "green", marginLeft: "10px", fontSize: "1.2rem" }}
                          />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No se han encontrado productos.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showComparacion && (
        <div style={cardStyle}>
          <Comparacion productosSeleccionados={productosSeleccionados} />
        </div>
      )}

      {showHistorial && (
        <div style={cardStyle}>
          <Historial />
        </div>
      )}

      {showBusqueda && (
        <div style={cardStyle}>
          <h2>Asistente Virtual</h2>
          <Asistente />
        </div>
      )}
    </div>
  );
}

export default Home;
