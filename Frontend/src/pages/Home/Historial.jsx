import React, { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Componente funcional Historial
 * @description Este componente muestra un historial de búsquedas previas con traducción dinámica.
 * Los ítems del historial son clicables y permiten ver un cuadro con mensajes detallados.
 * También permite eliminar búsquedas individuales del historial.
 * @returns {JSX.Element} - El JSX que representa la lista de búsquedas previas con opciones de interacción y visualización de mensajes.
 */
function Historial() {
  const { t } = useTranslation(); // Hook para traducción

  const [historial, setHistorial] = useState([
    {
      nombre: t("history1.search1"),
      mensajes: [
        { sender: t("history1.user"), content: t("assistant.welcome_message"), timestamp: "10:00 AM" },
        { sender: t("history1.bot"), content: t("assistant.response"), timestamp: "10:01 AM" },
      ],
    },
    {
      nombre: t("history1.search2"),
      mensajes: [
        { sender: t("history1.user"), content: t("assistant.type_message"), timestamp: "11:00 AM" },
        { sender: t("history1.bot"), content: t("assistant.processing"), timestamp: "11:02 AM" },
      ],
    },
    {
      nombre: t("history1.search3"),
      mensajes: [
        { sender: t("history1.user"), content: t("error.generic"), timestamp: "12:00 PM" },
        { sender: t("history1.bot"), content: t("assistant.response"), timestamp: "12:05 PM" },
      ],
    },
  ]);

  const [mensajesSeleccionados, setMensajesSeleccionados] = useState(null);

  const handleSeleccionarBusqueda = (busqueda) => {
    setMensajesSeleccionados(busqueda);
  };

  const handleEliminarBusqueda = (index) => {
    const nuevoHistorial = historial.filter((_, i) => i !== index);
    setHistorial(nuevoHistorial);
    setMensajesSeleccionados(null); // Cierra el cuadro si se elimina la búsqueda seleccionada
  };

  return (
    <div className="historial" style={{ textAlign: "center" }}>
      <h2>{t("history1.history")}</h2>
      {historial.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {historial.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              <span
                onClick={() => handleSeleccionarBusqueda(item)}
                style={{ cursor: "pointer", flex: 1, textAlign: "left" }}
              >
                {item.nombre}
              </span>
              <button
                onClick={() => handleEliminarBusqueda(index)}
                style={{
                  padding: "0.25rem 0.5rem",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {t("history1.delete")}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t("history1.no_searches")}</p>
      )}

      {/* Cuadro de mensajes */}
      {mensajesSeleccionados && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid #007bff",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            textAlign: "left",
          }}
        >
          <h3>{mensajesSeleccionados.nombre}</h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {mensajesSeleccionados.mensajes.map((mensaje, index) => (
              <li
                key={index}
                style={{
                  padding: "0.5rem",
                  borderBottom: "1px solid #ccc",
                  marginBottom: "0.5rem",
                }}
              >
                <p>
                  <strong>{mensaje.sender}:</strong> {mensaje.content}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#555" }}>
                  {mensaje.timestamp}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Historial;
