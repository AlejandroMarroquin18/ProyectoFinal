/**
 * @file Asistente.jsx
 * @description Componente de asistente virtual para interactuar con los usuarios, permitiéndoles enviar mensajes y recibir respuestas automáticas.
 * La conversación se maneja mediante un flujo de mensajes entre el usuario y el asistente (bot), mostrando los mensajes en una interfaz de chat.
 */

import React, { useState } from "react";
import { inputStyle, buttonStyle } from "./styles";

/**
 * Componente funcional Asistente
 * @description Este componente permite a los usuarios interactuar con un asistente virtual a través de un chat. Los usuarios pueden escribir un mensaje y el asistente responderá con un mensaje automatizado. 
 * El estado del chat se maneja con el hook `useState`, y la respuesta del bot se simula con un retardo utilizando `setTimeout`.
 * @returns {JSX.Element} - El JSX que representa el chat entre el usuario y el asistente virtual, incluyendo los campos de entrada y el botón para enviar los mensajes.
 */
function Asistente() {
  const [messages, setMessages] = useState([
    { sender: "bot", message: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?" },
  ]);

  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Función que maneja el envío del mensaje del usuario y la respuesta del asistente.
   * @async
   * @function handleSendMessage
   * @description Cuando el usuario escribe un mensaje y lo envía, el mensaje se agrega al historial de conversación.
   * Luego, se simula que el asistente está procesando la solicitud y después de un retardo, se envía la respuesta del asistente.
   */
  const handleSendMessage = async () => {
    if (!input.trim()) return;  // Evita el envío de mensajes vacíos
    const userMessage = { sender: "user", message: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);  // Agregar mensaje del usuario
    setInput("");  // Limpiar el campo de entrada
    setIsProcessing(true);  // Establecer estado de procesamiento

    // Simular la respuesta del bot
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", message: "Estoy buscando la información..." }
    ]);
    setTimeout(() => {
      const botResponse = "¡Aquí está la información que buscas! ¿Necesitas algo más?";

      // Actualizar el historial con la respuesta del bot
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),  // Eliminar mensaje de procesamiento
        { sender: "bot", message: botResponse },
      ]);
      setIsProcessing(false);  // Terminar el estado de procesamiento
    }, 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ overflowY: "auto", height: "300px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <p
              style={{
                margin: "5px",
                padding: "10px",
                background: msg.sender === "user" ? "#D3E8FFFF" : "#f1f1f1",
                borderRadius: "10px",
              }}
            >
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      {/* Contenedor para el cuadro de texto y el botón de enviar */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "1rem", borderRadius: "5px", width: "100%" }}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleSendMessage} style={{ ...buttonStyle, width: "auto" }}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Asistente;