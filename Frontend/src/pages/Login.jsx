import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icono from "../components/icon.png";
import { auth } from "../../config/firebaseConfigF"
import { signInWithEmailAndPassword } from "firebase/auth"

async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; 
    const idToken = await user.getIdToken();
    return idToken;
    
  } catch (error) {
    console.error('Error de login:', error.message);
  }
}

// Enviar el idToken al backend
async function sendTokenToBackend(idToken) {
  try {
    const response = await fetch('http://localhost:3000/auth/validate-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Token validado correctamente en el backend:', data);
    } else {
      console.error('Error en la validación del backend:', data.message);
    }
  } catch (error) {
    console.error('Error al enviar el token al backend:', error.message);
  }
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const idToken = await loginUser(email, password);

    if( idToken ) { 
      sendTokenToBackend(idToken);
      navigate("/home");
    }
    
    setError("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding:"1rem",
        flexDirection: "column",
      }}
    >
      <img
        src={Icono}
        alt="Asistente Virtual Icono"
        style={{
          width: "100px",
          height: "100px",
          marginBottom: "1rem",
        }}
      />
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
          border: "0.5px solid #007bff",
          
        }}
      >
        {/* Título */}
        <h1 style={{ marginBottom: "2rem" }}>Iniciar Sesión</h1>

        {/* Formulario */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Correo electrónico */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "1.5rem", padding: "0.75rem", width: "100%", boxSizing: "border-box", }}
            required
          />

          {/* Contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "1.5rem", padding: "0.75rem", width: "100%", boxSizing: "border-box", }}
            required
          />

          {/* Mensaje de error */}
          {error && <p style={{ color: "red", marginBottom: "1.5rem" }}>{error}</p>}

          {/* Botón Iniciar Sesión */}
          <button
            type="submit"
            style={{
              padding: "0.5em 1em",
              width: "50%", //cambiar a 50% dado el caso
              backgroundColor: "#007bff",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1em",
              marginBottom: "1.5rem",
            }}
          >
            Iniciar Sesión
          </button>
        </form>

        {/* ¿Olvidaste tu contraseña? */}
        <button
          type="button"
          style={{
            background: "none",
            color: "#007bff",
            fontSize: "0.9em",
            fontWeight: "400",
            margin: "1.5em 0",
            textDecoration: "underline",
            border: "none",
            cursor: "pointer",
          }}
        >
          ¿Olvidaste tu contraseña?
        </button>

        {/* Registrarse */}
        <div style={{ marginTop: "1.5rem" }}>
          <p style={{ display: "inline", marginRight: "0.5rem" }}>
            ¿No tienes cuenta?
          </p>
          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{
              padding: "0.5em 1em",
              fontSize: "1em",
              backgroundColor: "#007bff",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "50%", //Quitar dado el caso
            }}
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
