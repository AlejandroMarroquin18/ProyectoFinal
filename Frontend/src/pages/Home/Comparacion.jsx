import React, { useState, useEffect } from "react";
import {
  productTableStyle,
  tableHeaderStyle,
  tableRowStyle,
  tableCellStyle,
  cardStyle,
  buttonStyle,
} from "./styles";

/**
 * Componente funcional Comparacion
 * @description Muestra una tabla comparativa de los productos seleccionados, permitiendo al usuario ordenar por diferentes criterios.
 * @param {Array} productosSeleccionados - Los productos seleccionados para la comparación.
 * @returns {JSX.Element} - El JSX que representa la tabla comparativa con opciones de ordenación.
 */
function Comparacion({ productosSeleccionados }) {
  const [ordenarPor, setOrdenarPor] = useState("precio"); // Estado para el criterio de ordenación
  const [productosOrdenados, setProductosOrdenados] = useState([]);

  // Función para ordenar los productos
  const ordenarProductos = (criterio) => {
    const productosOrdenados = [...productosSeleccionados].sort((a, b) => {
      if (criterio === "precio") {
        return a.precio - b.precio;
      }
      if (criterio === "calificaciones") {
        return (b.calificacion || 0) - (a.calificacion || 0); // Aseguramos que las calificaciones existan
      }
      if (criterio === "envio") {
        return (a.tiempoEnvio || 0) - (b.tiempoEnvio || 0); // Aseguramos que el tiempo de envío exista
      }
      return 0;
    });
    return productosOrdenados;
  };

  // UseEffect para ordenar productos cuando el criterio cambia
  useEffect(() => {
    setProductosOrdenados(ordenarProductos(ordenarPor));
  }, [ordenarPor, productosSeleccionados]);

  return (
    <div>
      <h2>Tabla Comparativa de Productos</h2>

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
            Ordenar por Precio
          </button>
          <button
            onClick={() => setOrdenarPor("calificaciones")}
            style={buttonStyle}
          >
            Ordenar por Calificación
          </button>
          <button onClick={() => setOrdenarPor("envio")} style={buttonStyle}>
            Ordenar por Tiempo de Envío
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={productTableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={tableCellStyle}>Nombre</th>
              <th style={tableCellStyle}>Precio</th>
              <th style={tableCellStyle}>Características</th>
              <th style={tableCellStyle}>Tienda</th>
            </tr>
          </thead>
          <tbody>
            {productosOrdenados.length > 0 ? (
              productosOrdenados.map((producto, index) => (
                <tr key={index} style={tableRowStyle}>
                  <td style={tableCellStyle}>{producto.nombre}</td>
                  <td style={tableCellStyle}>${producto.precio}</td>
                  <td style={tableCellStyle}>{producto.caracteristicas}</td>
                  <td style={tableCellStyle}>{producto.tienda}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={tableCellStyle}>
                  No hay productos seleccionados.
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