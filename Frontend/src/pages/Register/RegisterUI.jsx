/**
 * @file RegisterUI.jsx
 * @description Componente de interfaz para el registro de usuarios en la aplicación.
 * Este componente maneja la vista del formulario de registro y la interacción con el usuario.
 * Se pasa información de estado y funciones desde el componente de lógica.
 */

import React from "react";
import Icono from "../../assets/images/icon.png";
import styles from "./Register.module.css"; 

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
function RegisterUI({ formData, error, handleChange, handleSubmit, navigate }) {
  return (
    <div className={styles.container}>
      <img
        src={Icono}
        alt="Asistente Virtual Icono"
        className={styles.icon}
      />
      {/* Card */}
      <div className={styles.card}>
        <h1 className={styles.title}>Regístrate Gratis</h1>

        {/* Formulario */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Nombre Completo */}
          <input
            type="text"
            placeholder="Nombre Completo"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={styles.input}
            required
          />

          {/* Correo electrónico */}
          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />

          {/* Contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />

          {/* Confirmar Contraseña */}
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />

          {/* Mensaje de error */}
          {error && <p className={styles.error}>{error}</p>}

          {/* Botón de Registrar */}
          <button type="submit" className={styles.button}>
            Registrar
          </button>
        </form>

        {/* Botón de Iniciar sesión */}
        <div className={styles.loginRedirect}>
          <p>¿Ya tienes cuenta?</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={styles.redirectButton}
          >
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterUI;