/**
 * @file Busqueda.jsx
 * @description Componente para gestionar la búsqueda de productos según criterios definidos por el usuario, como presupuesto, categoría y marca preferida.
 * Permite a los usuarios establecer sus preferencias y obtener recomendaciones desde el backend.
 */

import React, { useState } from "react";
import { inputStyle, buttonStyle } from "./styles";
import request from "../../services/api";

/**
 * Componente funcional Busqueda
 * @description Este componente permite al usuario definir criterios de búsqueda (presupuesto máximo, categoría y marca preferida) 
 * para recibir recomendaciones de productos. Los datos son enviados al backend a través de una solicitud POST.
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

    const requestBody = {
      maxBudget: Number(maxBudget),
      category,
      preferredBrand,
    };

    try {
      console.log("busqueda")
      const response = await request("/recommendation/recommend-pc", "POST", requestBody, null)
 
      const data = await response.json();
      setResultados(data.message);
    } catch (error) {
      console.error("Error:", error);
      setResultados("Hubo un problema al procesar la solicitud.");
    }
  };

  return (
    <div className="busqueda">
      <h2>Criterios de búsqueda</h2>
      <p style={{ marginBottom: "10px" }}>Define tus preferencias para encontrar la mejor opción</p>
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
        <option value="computadoras">Computadoras y laptops</option>
        <option value="smartphones">Smartphones</option>
        <option value="tablets">Tablets</option>
        <option value="monitores">Monitores</option>
        <option value="accesorios">Accesorios</option>
        <option value="componentes">Componentes de PC</option>
        <option value="gadgets">Gadgets</option>
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