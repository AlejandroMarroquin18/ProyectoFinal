import React, { useState, useEffect } from "react";
import {
  productTableStyle,
  tableHeaderStyle,
  tableRowStyle,
  tableCellStyle,
  cardStyle,
  buttonStyle,
} from "./styles";
import { useTranslation } from "react-i18next";

/**
 * Componente funcional Comparacion
 * @description Muestra una tabla comparativa de los productos seleccionados, permitiendo al usuario ordenar por diferentes criterios.
 * @param {Array} productosSeleccionados - Los productos seleccionados para la comparación.
 * @param {Function} setProductosSeleccionados - Función para actualizar los productos seleccionados.
 * @returns {JSX.Element} - El JSX que representa la tabla comparativa con opciones de ordenación.
 */
function Comparacion({ productosSeleccionados, setProductosSeleccionados }) {
  const [ordenarPor, setOrdenarPor] = useState("precio");
  const [productosOrdenados, setProductosOrdenados] = useState([]);
  const { t } = useTranslation();

  // Función para ordenar los productos
  const ordenarProductos = (criterio) => {
    const productosOrdenados = [...productosSeleccionados].sort((a, b) => {
      if (criterio === "precio") {
        return a.precio - b.precio;
      }
      if (criterio === "calificaciones") {
        return (b.calificacion || 0) - (a.calificacion || 0);
      }
      return 0;
    });
    return productosOrdenados;
  };

  // Función para eliminar un producto de la comparación
  const eliminarProducto = (productoId) => {
    const nuevosProductos = productosSeleccionados.filter(
      (producto) => producto.id !== productoId
    );
    setProductosSeleccionados(nuevosProductos); // Actualiza el estado en Home
  };

  // UseEffect para ordenar productos cuando el criterio cambia
  useEffect(() => {
    if (productosSeleccionados.length > 0) {
      setProductosOrdenados(ordenarProductos(ordenarPor));
    }
  }, [ordenarPor, productosSeleccionados]);

  return (
    <div>
      <h2>{t("comparison.title")}</h2>

      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <button onClick={() => setOrdenarPor("precio")} style={buttonStyle}>
            {t("comparison.sort_by_price")}
          </button>
          <button
            onClick={() => setOrdenarPor("calificaciones")}
            style={buttonStyle}
          >
            {t("comparison.sort_by_rating")}
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={productTableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={tableCellStyle}>{t("comparison.name")}</th>
              <th style={tableCellStyle}>{t("comparison.price")}</th>
              <th style={tableCellStyle}>{t("comparison.store")}</th>
              <th style={tableCellStyle}>{t("comparison.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {productosOrdenados.length > 0 ? (
              productosOrdenados.map((producto, index) => (
                <tr key={index} style={tableRowStyle}>
                  <td style={tableCellStyle}>{producto.nombre}</td>
                  <td style={tableCellStyle}>${producto.precio}</td>
                  <td style={tableCellStyle}>{producto.tienda}</td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                      }}
                    >
                      {t("comparison.delete")}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={tableCellStyle}>
                  {t("comparison.no_products_selected")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comparacion;
