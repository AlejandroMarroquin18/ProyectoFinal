import React, { useState } from "react";
import { inputStyle, buttonStyle } from "./styles";

/**
 * Componente funcional Busqueda
 * @description Este componente permite al usuario definir criterios de búsqueda (presupuesto máximo, categoría y marca preferida)
 * para recibir recomendaciones de productos.
 * @param {Function} setResultados - Función para actualizar los resultados mostrados, generalmente en el componente padre.
 * @returns {JSX.Element} - El JSX que representa el formulario de búsqueda con los campos de entrada para presupuesto, categoría y marca preferida.
 */
function Busqueda({ setResultados }) {
  const [maxBudget, setMaxBudget] = useState("");
  const [category, setCategory] = useState("");
  const [preferredBrand, setPreferredBrand] = useState("");

  const handleBuscar = async () => {
    if (!maxBudget || !category) {
      alert("Por favor, ingresa el presupuesto y la categoría.");
      return;
    }

    // Simulación de productos (debería ser reemplazada por la conexión al backend)
    const productosSimulados = [
      {
        nombre: "Laptop HP 15",
        precio: 350,
        enlaceCompra: "https://www.tienda.com/laptop-hp-15",
        imagen: "https://via.placeholder.com/100",
        tienda: "Tienda A",
      },
      {
        nombre: "Smartphone Samsung Galaxy S22",
        precio: 750,
        enlaceCompra: "https://www.tienda.com/samsung-galaxy-s22",  
        imagen: "https://via.placeholder.com/100",
        tienda: "Tienda B",
      },
      {
        nombre: "Monitor Dell 24",
        precio: 200,
        enlaceCompra: "https://www.tienda.com/dell-monitor-24",
        imagen: "https://via.placeholder.com/100",
        tienda: "Tienda C",
      },
    ];

    setResultados(productosSimulados);
  };

  return (
    <div className="busqueda">
      <h2>Criterios de búsqueda</h2>
      <p style={{ marginBottom: "10px" }}>
        Define tus preferencias para encontrar la mejor opción
      </p>
      <input
        type="number"
        placeholder="Presupuesto máximo"
        style={inputStyle}
        value={maxBudget}
        onChange={(e) => setMaxBudget(e.target.value)}
        required
      />
      <select
        style={inputStyle}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>
          Selecciona una categoría
        </option>
        <option value="computadoras">Computadoras y laptops</option>{" "}
        <option value="smartphones">Smartphones</option>{" "}
        <option value="tablets">Tablets</option>{" "}
        <option value="monitores">Monitores</option>{" "}
        <option value="accesorios">Accesorios</option>{" "}
        <option value="ram">Memoria RAM</option>{" "}
        <option value="cpu">Procesador</option>{" "}
        <option value="gpu">Tarjeta Gráfica</option>{" "}
        <option value="psu">Fuente de poder</option>{" "}
        <option value="gabinete">Gabinete</option>{" "}
        <option value="board">Placa Base</option>{" "}
        <option value="gadgets">Gadgets</option>{" "}
        <option value="redes">Redes</option>
      </select>
      <input
        type="text"
        placeholder="Marca (opcional)"
        style={inputStyle}
        value={preferredBrand}
        onChange={(e) => setPreferredBrand(e.target.value)}
      />
      <button onClick={handleBuscar} style={buttonStyle}>
        Buscar
      </button>
    </div>
  );
}

export default Busqueda;
