/**
 * @file RegisterUI.jsx
 * @description Componente de interfaz para el registro de usuarios en la aplicación.
 * Este componente maneja la vista del formulario de registro y la interacción con el usuario.
 * Se pasa información de estado y funciones desde el componente de lógica.
 */

import React from "react";
import Icono from "../../assets/images/icon.png";
import styles from "./Register.module.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * Componente funcional RegisterUI
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {Object} props.formData - Datos del formulario de registro (nombre completo, correo, etc.).
 * @param {string} props.error - Mensaje de error si ocurre uno.
 * @param {Function} props.handleChange - Función para manejar cambios en los campos del formulario.
 * @param {Function} props.handleSubmit - Función para manejar el envío del formulario.
 * @param {Function} props.navigate - Función para redirigir al usuario a otras rutas.
 * @returns {JSX.Element} - El JSX que representa la interfaz de usuario de la página de registro.
 */
function RegisterUI({
  formData,
  error,
  successMessage,
  fieldErrors,
  handleChange,
  handleSubmit,
  navigate,
}) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Cambiar el idioma dinámicamente
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
        <h1 className={styles.title}>{t("register.title")}</h1>

        {/* Mensaje de éxito */}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        {/* Formulario */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Nombre Completo */}
          <input
            type="text"
            placeholder={t("register.fullName")}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`${styles.input} ${
              fieldErrors.fullName ? styles.inputError : ""
            }`}
            required
          />
          {fieldErrors.fullName && (
            <p className={styles.error}>{fieldErrors.fullName}</p>
          )}

          {/* Correo electrónico */}
          <input
            type="email"
            placeholder={t("register.email")}
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${
              fieldErrors.email ? styles.inputError : ""
            }`}
            required
          />
          {fieldErrors.email && (
            <p className={styles.error}>{fieldErrors.email}</p>
          )}

          {/* Contraseña */}
          <input
            type="password"
            placeholder={t("register.password")}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${styles.input} ${
              fieldErrors.password ? styles.inputError : ""
            }`}
            required
          />
          {fieldErrors.password && (
            <p className={styles.error}>{fieldErrors.password}</p>
          )}

          {/* Confirmar Contraseña */}
          <input
            type="password"
            placeholder={t("register.confirmPassword")}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`${styles.input} ${
              fieldErrors.confirmPassword ? styles.inputError : ""
            }`}
            required
          />
          {fieldErrors.confirmPassword && (
            <p className={styles.error}>{fieldErrors.confirmPassword}</p>
          )}

          {/* Mensaje de error */}
          {error && <p className={styles.error}>{error}</p>}

          {/* Botón de Registrar */}
          <button type="submit" className={styles.button}>
            {t("register.registerButton")}
          </button>
        </form>

        {/* Botón de Iniciar sesión */}
        <div className={styles.loginRedirect}>
          <p>{t("register.alreadyHaveAccount")}</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={styles.redirectButton}
          >
            {t("register.loginButton")}
          </button>
        </div>
      </div>
    </div>
  );
}

RegisterUI.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  fieldErrors: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
  successMessage: PropTypes.string,
};

RegisterUI.defaultProps = {
  error: "",
  successMessage: "",
};

export default RegisterUI;
