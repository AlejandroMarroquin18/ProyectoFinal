import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import "regenerator-runtime/runtime";
import axios from "axios";

const Asistente = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      message: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatName, setChatName] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);

  const startListening = () => {
    console.log("Iniciando grabación");
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

          // Enviar el audio al backend tan pronto como se detenga la grabación
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
    console.log("Deteniendo grabación");
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    console.log("Enviando audio al backend...");

    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.ogg");

    try {
        const transcriptionResponse = await axios.post("http://localhost:3000/speech/transcribe", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Respuesta del backend:", transcriptionResponse.data);
        console.log("Transcripción recibida:", transcriptionResponse.data.transcription);

        const transcriptionText = transcriptionResponse.data.transcription || "No se pudo transcribir el audio";

        // Solo actualiza el campo de entrada con la transcripción
        setInput(transcriptionText);

    } catch (error) {
        console.error("Error al enviar el audio al backend:", error);
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", message: "Hubo un error al procesar tu solicitud." },
        ]);
    }
};

  const handleSendMessage = async () => {
    if (!input.trim() && !audioBlob) return;

    console.log("Enviando mensaje...");
    console.log("Texto:", input);
    console.log("Audio URL:", audioBlob);

    const userMessage = { sender: "user", message: input };

    // Agregar el mensaje del usuario al historial de conversación
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
                  Tu navegador no soporta la etiqueta de audio.
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
          placeholder="Escribe tu mensaje..."
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
