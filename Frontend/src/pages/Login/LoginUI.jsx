/**
 * @file LoginUI.jsx
 * @description Componente de interfaz para la página de inicio de sesión.
 * Presenta el formulario de inicio de sesión donde los usuarios pueden ingresar su correo electrónico y contraseña.
 */

import React from "react";
import Icono from "../../assets/images/icon.png";
import styles from "./Login.module.css"; // Estilos específicos de Login
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

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
function LoginUI({
  email,
  password,
  error,
  showPopup,
  loading,
  setEmail,
  setPassword,
  handleSubmit,
  handleGoogleLogin,
  handleFacebookLogin,
  handlePassword,
  navigate,
}) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Cambia el idioma dinámicamente
  };
  return (
    <div className={styles.container}>
      <div className={styles.languageButtons}>
        <button
          onClick={() => changeLanguage("es")}
          className={styles.languageButton}
        >
          ES
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className={styles.languageButton}
        >
          EN
        </button>
      </div>
      <img src={Icono} alt="Asistente Virtual Icono" className={styles.icon} />

      {/* Card */}
      <div className={styles.card}>
        <h1 className={styles.title}>{t("login.loginTitle")}</h1>

        {/* Formulario */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Correo electrónico */}
          <input
            type="email"
            placeholder={t("login.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />

          {/* Contraseña */}
          <input
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />

          {/* Mensaje de error */}
          {error && showPopup && (
            <div className={styles.popup}>
              <p>{error}</p>
            </div>
          )}

          {/* Botón Iniciar Sesión */}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? (
              <div className={styles.spinner}></div>
            ) : (
              t("login.loginButton")
            )}
          </button>
        </form>

        {/* Botones Google y Facebook */}
        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? (
            <div className={styles.spinner}></div>
          ) : (
            t("login.googleLoginButton")
          )}
        </button>

        <button
          type="button"
          className={styles.facebookButton}
          onClick={handleFacebookLogin}
          disabled={loading}
        >
          {loading ? (
            <div className={styles.spinner}></div>
          ) : (
            t("login.facebookLoginButton")
          )}
        </button>

        {/* ¿Olvidaste tu contraseña? */}
        <button
          type="button"
          className={styles.forgotPasswordButton}
          onClick={() => handlePassword(email)}
        >
          {t("login.forgotPassword")}
        </button>

        {/* Registrarse */}
        <div className={styles.registerRedirect}>
          <p>{t("login.noAccount")}</p>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className={styles.redirectButton}
          >
            {t("login.register")}
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
