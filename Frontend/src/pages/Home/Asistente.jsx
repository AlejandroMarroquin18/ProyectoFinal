import React, { useState, useRef, useEffect } from "react";
import { inputStyle, buttonStyle } from "./styles";
import { FaMicrophone, FaStop } from "react-icons/fa"; 
import axios from "axios"; 

function Asistente() {
  const [messages, setMessages] = useState([
    { sender: "bot", message: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?" },
  ]);
  
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            audioChunksRef.current = [];
          };
          mediaRecorderRef.current.start();
        })
        .catch((error) => console.error("Error al acceder al micrófono:", error));
    } else if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  const handleSendMessage = async () => {
    if (!input.trim() && !audioUrl) return;
  
    const userMessage = { sender: "user", message: input, audioUrl };
  
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setAudioUrl(null);
    setIsProcessing(true);
  
    try {
      // Crear chat si es la primera vez que se envía un mensaje
      const chatName = input.split(" ").slice(0, 5).join(" "); 
      
      // Verificar si el chat ya existe, si no, crear uno
      const chatResponse = await axios.post("http://localhost:3000/chat/create-chat", { chatName });
      console.log(chatResponse.data);
  
      // Enviar el mensaje al backend para actualizar el chat
      const response = await axios.post("http://localhost:3000/chat/update-chat", {
        chatName,
        message: input,
      });
  
      // Verificar el contenido de botResponse
      const botResponse = response.data.botResponse ? response.data.botResponse.content : "No se pudo obtener la respuesta";
  
      if (response.data.success === true) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", message: botResponse },
        ]);
      } else {
        console.log("Se entra al bloque ELSE");
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

  const handleRecordClick = () => {
    setIsRecording((prev) => !prev);
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
              {msg.audioUrl && (
                <audio controls>
                  <source src={msg.audioUrl} type="audio/wav" />
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
        
        <button onClick={handleSendMessage} style={{ ...buttonStyle, width: "auto" }}>
          Enviar
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