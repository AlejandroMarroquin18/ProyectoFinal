/**
 * @file LoginUI.jsx
 * @description Componente de interfaz para la página de inicio de sesión.
 * Presenta el formulario de inicio de sesión donde los usuarios pueden ingresar su correo electrónico y contraseña.
 */

import React from "react";
import Icono from "../../assets/images/icon.png";
import styles from "./Login.module.css";  // Estilos específicos de Login
import PropTypes from 'prop-types';


/**
 * Componente que renderiza la interfaz de inicio de sesión.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.email - Correo electrónico del usuario.
 * @param {string} props.password - Contraseña del usuario.
 * @param {string} props.error - Mensaje de error si ocurre algún problema.
 * @param {function} props.setEmail - Función para actualizar el correo electrónico.
 * @param {function} props.setPassword - Función para actualizar la contraseña.
 * @param {function} props.handleSubmit - Función que maneja el envío del formulario.
 * @param {function} props.navigate - Función de navegación de react-router-dom.
 * @returns {JSX.Element} Interfaz de usuario para el inicio de sesión.
 */
function LoginUI({ email, password, error, showPopup, loading, setEmail, setPassword, handleSubmit, handleGoogleLogin, handleFacebookLogin, handlePassword, navigate }) {
  return (
    <div className={styles.container}>
      <img src={Icono} alt="Asistente Virtual Icono" className={styles.icon} />
      
      {/* Card */}
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesión</h1>

        {/* Formulario */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Correo electrónico */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />

          {/* Contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />

          {/* Mensaje de error */}
          {error && showPopup &&(
            <div className={styles.popup}>
              <p>{error}</p>
            </div>
          )}

          {/* Botón Iniciar Sesión */}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? <div className={styles.spinner}></div> : "Iniciar Sesión"}
          </button>
        </form>

        {/* Botones Google y Facebook */}
        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? <div className={styles.spinner}></div> : "Iniciar con Google"}
        </button>
        
        <button
          type="button"
          className={styles.facebookButton}
          onClick={handleFacebookLogin}
          disabled={loading}
        >
          {loading ? <div className={styles.spinner}></div> : "Iniciar con Facebook"}
        </button>

        {/* ¿Olvidaste tu contraseña? */}
        <button
          type="button"
          className={styles.forgotPasswordButton}
          onClick={() => handlePassword(email)}
        >
          ¿Olvidaste tu contraseña?
        </button>

        {/* Registrarse */}
        <div className={styles.registerRedirect}>
          <p>¿No tienes cuenta?</p>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className={styles.redirectButton}
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}

LoginUI.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  showPopup: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleGoogleLogin: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default LoginUI;