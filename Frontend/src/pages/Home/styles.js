/**
 * @file styles.js
 * @description Estilos comunes reutilizables en los componentes de la aplicación.
 * Contiene los estilos básicos para botones, tarjetas e inputs que se utilizan en varios componentes, como 
 * Busqueda, Historial y Home.
 */

/**
 * Estilo para los botones comunes en la aplicación.
 * Se aplica a los botones de acción como "Buscar", "Cerrar sesión", etc.
 */
export const buttonStyle = {
  padding: "0.5em 1em",         /* Relleno interno del botón */
  width: "100%",                /* Ancho completo del botón */
  backgroundColor: "#007bff",  /* Fondo azul */
  color: "#ffffff",            /* Texto blanco */
  border: "none",              /* Sin borde */
  borderRadius: "4px",         /* Bordes redondeados */
  cursor: "pointer",           /* Muestra el cursor de tipo puntero al pasar por encima */
  fontSize: "1em",             /* Tamaño de fuente estándar */
};

/**
 * Estilo para las tarjetas que contienen secciones de contenido, como las que muestran los resultados 
 * de búsqueda o el historial de búsquedas.
 */
export const cardStyle = {
  padding: "2rem",              /* Relleno interno de la tarjeta */
  borderRadius: "8px",          /* Bordes redondeados */
  backgroundColor: "#fff",      /* Fondo blanco */
  marginBottom: "2rem",         /* Espacio debajo de la tarjeta */
  border: "0.5px solid #007bff", /* Borde de color azul claro */
};

/**
 * Estilo para los campos de entrada (inputs), utilizado en formularios como el de búsqueda.
 * Se aplica a los inputs de tipo texto, número, etc.
 */
export const inputStyle = {
  marginBottom: "1rem",        /* Espacio debajo de cada input */
  padding: "0.75rem",          /* Relleno interno de los inputs */
  width: "100%",               /* Ancho completo del input */
  borderRadius: "4px",         /* Bordes redondeados */
  border: "1px solid #ccc",    /* Borde gris claro */
};
