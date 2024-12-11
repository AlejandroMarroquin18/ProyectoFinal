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

/**
 * Estilo para las tarjetas de productos.
 * Contiene la imagen del producto, nombre, precio y tienda.
 */
export const productCardStyle = {
  padding: "1rem",               /* Relleno interno de la tarjeta */
  borderRadius: "8px",           /* Bordes redondeados */
  backgroundColor: "#FFFFFFFF",  /* Fondo gris claro */
  marginBottom: "1.5rem",        /* Espacio debajo de la tarjeta */
  border: "1px solid #007bff",   /* Borde de color azul */
  display: "flex",               /* Usamos flex para organizar los elementos */
  flexDirection: "row",          /* Dirección horizontal (imagen y texto en fila) */
  justifyContent: "flex-start",  /* Alinear los elementos al inicio */
  alignItems: "center",          /* Centrar los elementos verticalmente */
  width: "auto",                 /* Ancho automático para la tarjeta */
  textAlign: "left",             /* Alineación del texto a la izquierda */
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", /* Sombra sutil para profundidad */
};

/**
 * Estilo para la imagen del producto.
 * Limita el tamaño de la imagen para que se vea bien dentro de la tarjeta.
 */
export const productImageStyle = {
  width: "100px",                 /* Ocupa el 40% del ancho de la tarjeta */
  height: "100px",              /* Altura fija para la imagen */
  objectFit: "cover",           /* Recorta la imagen para ajustarla sin distorsionar */
  borderRadius: "8px",          /* Bordes redondeados */
  marginRight: "1rem",          /* Espacio a la derecha de la imagen */
};

/**
 * Estilo para la información del producto (nombre, precio, tienda).
 */
export const productInfoStyle = {
  margin: "0.5rem 0",            /* Espacio entre los elementos */
  fontSize: "1rem",              /* Tamaño de fuente estándar */
  color: "#333",                 /* Color de texto oscuro */
};

/**
 * Estilo para el enlace de compra.
 * Se asegura de que el enlace se vea como un botón.
 */
export const productLinkStyle = {
  marginTop: "1rem",             /* Espacio en la parte superior */
  color: "#007bff",              /* Color azul para el enlace */
  textDecoration: "none",        /* Sin subrayado */
  fontWeight: "bold",            /* Hacer el texto en negrita */
  cursor: "pointer",            /* Cambiar el cursor a puntero */
  fontSize: "1.1rem",            /* Aumentar un poco el tamaño de la fuente */
};
export const productTableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "1rem",
};

export const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
};

export const tableRowStyle = {
  borderBottom: "1px solid #ddd",
};

export const tableCellStyle = {
  padding: "8px",
  textAlign: "left",
};

export const deleteButtonStyle = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "14px",
};