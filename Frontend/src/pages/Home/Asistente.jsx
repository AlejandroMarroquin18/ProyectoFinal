import React, { useState, useRef, useEffect } from "react";
import { inputStyle, buttonStyle } from "./styles";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useTranslation } from "react-i18next";

/**
 * Componente funcional Asistente
 * @description Este componente permite a los usuarios interactuar con un asistente virtual a través de un chat. Los usuarios pueden escribir un mensaje, enviar mensajes de audio y el asistente responderá con un mensaje automatizado.
 * El estado del chat se maneja con el hook `useState`, y la respuesta del bot se simula con un retardo utilizando `setTimeout`.
 * @returns {JSX.Element} - El JSX que representa el chat entre el usuario y el asistente virtual, incluyendo los campos de entrada, los botones de "Enviar" y "Grabar Audio".
 */
function Asistente() {
  const { t } = useTranslation(); // Hook de traducción
  const [messages, setMessages] = useState([
    { sender: "bot", message: t("assistant.welcome_message") },
  ]);

  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  /**
   * Efecto que maneja la grabación de audio. Al iniciar la grabación, solicita permiso para acceder al micrófono del usuario.
   * Si la grabación está activa, comienza a grabar y almacena los fragmentos de audio.
   * Cuando la grabación se detiene, se genera un archivo de audio que puede ser reproducido.
   */
  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };
          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/wav",
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            audioChunksRef.current = [];
          };
          mediaRecorderRef.current.start();
        })
        .catch((error) =>
          console.error("Error al acceder al micrófono:", error)
        );
    } else if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  /**
   * Función que maneja el envío del mensaje del usuario y la respuesta del asistente.
   * @async
   * @function handleSendMessage
   * @description Cuando el usuario escribe un mensaje y lo envía, el mensaje se agrega al historial de conversación.
   * Luego, se simula que el asistente está procesando la solicitud y después de un retardo, se envía la respuesta del asistente.
   */
  const handleSendMessage = async () => {
    if (!input.trim() && !audioUrl) return;
    const userMessage = { sender: "user", message: input, audioUrl };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setAudioUrl(null);
    setIsProcessing(true);

    // Simular la respuesta del bot
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", message: t("assistant.processing") },
    ]);
    setTimeout(() => {
      const botResponse = t("assistant.response");
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { sender: "bot", message: botResponse },
      ]);
      setIsProcessing(false);
    }, 2000);
  };

  /**
   * Función para manejar la tecla "Enter" al escribir en el campo de texto.
   * @function handleKeyPress
   * @description Permite enviar el mensaje cuando el usuario presiona la tecla "Enter".
   * @param {Event} e - El evento de teclado.
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  /**
   * Función que maneja la acción de grabar o detener la grabación de audio.
   * @function handleRecordClick
   * @description Activa o desactiva la grabación del audio en función del estado actual de grabación.
   */
  const handleRecordClick = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ overflowY: "auto", height: "300px" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
          >
            <p
              style={{
                margin: "5px",
                padding: "10px",
                background: msg.sender === "user" ? "#D3E8FFFF" : "#f1f1f1",
                borderRadius: "10px",
              }}
            >
              {msg.message}
              {msg.audioUrl && (
                <audio controls>
                  <source src={msg.audioUrl} type="audio/wav" />
                  {t("assistant.audio_not_supported")}
                </audio>
              )}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ padding: "1rem", borderRadius: "5px", width: "100%" }}
          placeholder={t("assistant.type_message")}
        />

        <button
          onClick={handleSendMessage}
          style={{ ...buttonStyle, width: "auto" }}
        >
          {t("assistant.send")}{" "}
        </button>

        <button
          onClick={handleRecordClick}
          style={{
            ...buttonStyle,
            width: "auto",
            backgroundColor: isRecording ? "red" : "#007bff",
            color: "white",
          }}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </button>
      </div>
    </div>
  );
}

export default Asistente;
