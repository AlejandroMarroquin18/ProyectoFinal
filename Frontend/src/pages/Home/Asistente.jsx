import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { inputStyle, buttonStyle } from "./styles";
import { useTranslation } from "react-i18next";
import "regenerator-runtime/runtime";
import axios from "axios";

/**
 * Componente funcional Asistente
 * @description Este componente permite a los usuarios interactuar con un asistente virtual a través de un chat. Los usuarios pueden escribir un mensaje, enviar mensajes de audio y el asistente responderá con un mensaje automatizado.
 * El estado del chat se maneja con el hook `useState`, y la respuesta del bot se simula con un retardo utilizando `setTimeout`.
 * @returns {JSX.Element} - El JSX que representa el chat entre el usuario y el asistente virtual, incluyendo los campos de entrada, los botones de "Enviar" y "Grabar Audio".
 */
const Asistente = () => {
  const { t } = useTranslation(); // Hook de traducción
  const [messages, setMessages] = useState([
    { sender: "bot", message: t("assistant.welcome_message") }, // Mensaje traducido
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatName, setChatName] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);

/**
   * Función que empieza y detiene grabaciones en el chat.
   * @function handleSendMessage
   * @description Tiene el Hook personalizado para iniciar una grabación, detenerla y procesarla.
   */

  const startListening = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          console.log("Datos disponibles para grabación:", event.data);
          audioChunks.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          console.log("Grabación detenida, procesando audio");
          const audioBlob = new Blob(audioChunks, { type: "audio/ogg" });
          setAudioBlob(audioBlob);

          sendAudioToBackend(audioBlob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error al acceder al micrófono:", error);
      });
  };

  const stopListening = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

/**
   * Función envía el audio para ser procesado y transcrito.
   * @function handleSendMessage
   * @description Interactua con el Google-Speech-to-Text para transcribir las peticiones por audio.
   */
  const sendAudioToBackend = async (audioBlob) => {

    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.ogg");

    try {
        const transcriptionResponse = await axios.post("http://localhost:3000/speech/transcribe", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const transcriptionText = transcriptionResponse.data.transcription || "No se pudo transcribir el audio";

        setInput(transcriptionText);

    } catch (error) {
        console.error("Error al enviar el audio al backend:", error);
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", message: "Hubo un error al procesar tu solicitud." },
        ]);
    }
};

/**
   * Función que crea y actualiza los chats.
   * @function handleSendMessage
   * @description Interactua con el Backend para enviar los mensajes del chat y procesarlos con Gemini.
   */
  const handleSendMessage = async () => {

    if (!input.trim() && !audioBlob) return;

    const userMessage = { sender: "user", message: input };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      let currentChatName = chatName;

      if (!chatName) {
        currentChatName = input.split(" ").slice(0, 5).join(" ");
        setChatName(currentChatName);

        await axios.post("http://localhost:3000/chat/create-chat", {
          chatName: currentChatName,
        });
        console.log("Chat creado con el nombre:", currentChatName);
      }

      const response = await axios.post(
        "http://localhost:3000/chat/update-chat",
        {
          chatName: currentChatName,
          message: input,
        }
      );

      const botResponse = response.data.botResponse
        ? response.data.botResponse.content
        : "No se pudo obtener la respuesta";

      if (response.data.success === true) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", message: botResponse },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", message: "Hubo un problema procesando tu mensaje." },
        ]);
      }

      setIsProcessing(false);
    } catch (error) {
      console.error("Error al enviar el mensaje al backend:", error);
      setIsProcessing(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", message: "Hubo un error al procesar tu solicitud." },
      ]);
    }
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

                  <source src={msg.audioUrl} type="audio/ogg" />
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

          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Enviar

        </button>

        <button
          onClick={() => (isRecording ? stopListening() : startListening())}
          style={{
            padding: "10px 20px",
            backgroundColor: isRecording ? "red" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </button>
      </div>
    </div>
  );
};

export default Asistente;
