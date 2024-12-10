import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import request from "../../services/api";

function Historial() {
  const { t } = useTranslation();
  const [historial, setHistorial] = useState([]);
  const [mensajesSeleccionados, setMensajesSeleccionados] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await request('/chat/get-all-chats', 'GET'); 
        const data = await response.json();
        setHistorial(data); // Asegúrate de que data es un array de objetos chat
      } catch (error) {
        console.error("Error al cargar el historial:", error);
      }
    };

    fetchHistorial();
  }, []);

  const handleSeleccionarBusqueda = (busqueda) => {
    setMensajesSeleccionados(busqueda);
  };

  const handleEliminarBusqueda = async (index) => {
    const chatName = historial[index].name;  // Usa 'name' para acceder al nombre del chat
    try {
      const response = await request(`/chat/delete-chat`, 'DELETE', { chatName });
      const data = await response.json();
      console.log(data.message);

      const nuevoHistorial = historial.filter((_, i) => i !== index);
      setHistorial(nuevoHistorial);
      setMensajesSeleccionados(null); 
    } catch (error) {
      console.error("Error al eliminar el chat:", error);
    }
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
                {item.name}
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
          <h3>{mensajesSeleccionados.name}</h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {mensajesSeleccionados.messages && Object.values(mensajesSeleccionados.messages).map((mensaje, index) => (
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