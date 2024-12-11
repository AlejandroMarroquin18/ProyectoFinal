import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icono from "../../assets/images/icon.png";
import { auth } from "../../../config/firebaseConfigF";
import { signOut } from "firebase/auth";
import Asistente from "./Asistente";
import Busqueda from "./Busqueda";
import Historial from "./Historial";
import Comparacion from "./Comparacion"; // Importa el componente de comparación
import {
  buttonStyle,
  cardStyle,
  productCardStyle,
  productImageStyle,
  productInfoStyle,
  productLinkStyle,
} from "./styles";
import { useTranslation } from "react-i18next";
import styles from "../Login/Login.module.css";

/**
 * Componente funcional Home
 * @description Este componente es la página de inicio del asistente virtual, donde los usuarios pueden buscar productos,
 * ver su historial de búsquedas previas o comparar productos. Se gestionan tres vistas: Búsqueda, Historial y Comparación.
 * @returns {JSX.Element} - El JSX que representa el interfaz de usuario del Home, incluyendo los botones para alternar entre
 * la búsqueda, historial y comparación, los resultados de la búsqueda, y la opción para cerrar sesión.
 */
function Home() {
  const { t, i18n } = useTranslation();
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

  const cambiarIdioma = (lang) => {
    i18n.changeLanguage(lang);
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
    // Evita duplicados en productos seleccionados
    setProductosSeleccionados((prevProductos) => {
      if (!prevProductos.some((p) => p.id === producto.id)) {
        return [...prevProductos, producto];
      }
      return prevProductos;
    });

    // Evita duplicados en productos añadidos
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

        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <button
            onClick={() => cambiarIdioma("es")}
            className={styles.languageButton}
          >
            ES
          </button>
          <button
            onClick={() => cambiarIdioma("en")}
            className={styles.languageButton}
          >
            EN
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "1rem", whiteSpace: "nowrap" }}>
            {t("welcome_user")}
          </span>
          <button onClick={CerrarSesion} style={buttonStyle}>
            {t("logout")}
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <button onClick={mostrarBusqueda} style={buttonStyle}>
            {t("search1")}
          </button>
          <button onClick={mostrarComparacion} style={buttonStyle}>
            {t("comparison1")}
          </button>
          <button onClick={mostrarHistorial} style={buttonStyle} id="historialButton">
            {t("history")}
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
              <h2>{t("best_options")}</h2>

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
                          <strong>{t("price")}:</strong> ${producto.precio}
                        </p>
                        <p>
                          <strong>{t("store")}:</strong> {producto.tienda}
                        </p>
                        <span
                          onClick={() => verProducto(producto.enlaceCompra)}
                          style={productLinkStyle}
                        >
                          {t("view_product")}
                        </span>
                        {/* Mostrar el ícono de confirmación si el producto está añadido */}
                        <button
                          onClick={() => agregarAComparacion(producto)}
                          style={{
                            marginTop: "10px",
                            marginLeft: "10px",
                            padding: "0.5rem 1rem",
                            backgroundColor: productosAñadidos.some(
                              (p) => p.id === producto.id
                            )
                              ? "green"
                              : "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {productosAñadidos.some((p) => p.id === producto.id)
                            ? t("added_to_comparison")
                            : t("add_to_comparison")}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{t("no_products_found")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showComparacion && (
        <div style={cardStyle}>
          <Comparacion
            productosSeleccionados={productosSeleccionados}
            setProductosSeleccionados={setProductosSeleccionados}
          />
        </div>
      )}

      {showHistorial && (
        <div style={cardStyle}>
          <Historial />
        </div>
      )}

      {showBusqueda && (
        <div style={cardStyle}>
          <h2>{t("virtual_assistant")}</h2>
          <Asistente />
        </div>
      )}
    </div>
  );
}

export default Home;
