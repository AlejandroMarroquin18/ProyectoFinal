import React, { useState } from "react";
import { inputStyle, buttonStyle } from "./styles";
import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../../assets/animations/loading.json";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultados, setResultadosLocal] = useState([]); // Estado local para resultados
  const [disabled, setDisabled] = useState(false); // Estado para habilitar/deshabilitar los campos

  /**
   * Función para manejar la búsqueda de productos.
   * @async
   */
  const handleBuscar = async () => {
    setError("");

    // Validaciones
    if (!maxBudget || isNaN(maxBudget) || maxBudget <= 0) {
      setError("Por favor, ingresa un presupuesto válido.");
      return;
    }

    if (!category) {
      setError("Por favor, selecciona una categoría.");
      return;
    }

    setLoading(true);
    setDisabled(true); // Deshabilita los campos de búsqueda

    try {
      // Simulación de productos (debería ser reemplazada por la conexión al backend)
      const productosSimulados = [
        {
          id: 1,
          nombre: "Laptop HP 15",
          precio: 350,
          enlaceCompra: "https://www.tienda.com/laptop-hp-15",
          imagen: "https://via.placeholder.com/100",
          tienda: "Tienda A",
        },
        {
          id: 2,
          nombre: "Smartphone Samsung Galaxy S22",
          precio: 750,
          enlaceCompra: "https://www.tienda.com/samsung-galaxy-s22",
          imagen: "https://via.placeholder.com/100",
          tienda: "Tienda B",
        },
        {
          id: 3,
          nombre: "Monitor Dell 24",
          precio: 200,
          enlaceCompra: "https://www.tienda.com/dell-monitor-24",
          imagen: "https://via.placeholder.com/100",
          tienda: "Tienda C",
        },
      ];

      // Filtra los productos simulados por presupuesto y marca
      const resultadosFiltrados = productosSimulados.filter(
        (producto) =>
          producto.precio <= maxBudget &&
          (preferredBrand
            ? producto.nombre
                .toLowerCase()
                .includes(preferredBrand.toLowerCase())
            : true)
      );

      // Actualiza el estado local de los resultados
      setResultadosLocal(resultadosFiltrados);

      // También actualiza el estado del componente padre si es necesario
      setResultados(resultadosFiltrados);
    } catch (err) {
      setError(
        "Hubo un error al buscar productos. Por favor, intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMaxBudget("");
    setCategory("");
    setPreferredBrand("");
    setResultadosLocal([]); // Limpiar resultados locales
    setResultados([]); // Limpiar los resultados en el componente padre
    setDisabled(false); // Vuelve a habilitar los campos de búsqueda
    setError("");
  };

  return (
    <div className="busqueda">
      <h2>Criterios de búsqueda</h2>
      <p style={{ marginBottom: "10px" }}>
        Define tus preferencias para encontrar la mejor opción.
      </p>

      {error && (
        <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <input
        type="number"
        placeholder="Presupuesto máximo"
        style={inputStyle}
        value={maxBudget}
        onChange={(e) => setMaxBudget(e.target.value)}
        disabled={disabled}
        required
      />
      <select
        style={inputStyle}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={disabled}
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
        <option value="ram">Memoria RAM</option>
        <option value="cpu">Procesador</option>
        <option value="gpu">Tarjeta Gráfica</option>
        <option value="psu">Fuente de poder</option>
        <option value="gabinete">Gabinete</option>
        <option value="board">Placa Base</option>
        <option value="gadgets">Gadgets</option>
        <option value="redes">Redes</option>
      </select>
      <input
        type="text"
        placeholder="Marca (opcional)"
        style={inputStyle}
        value={preferredBrand}
        onChange={(e) => setPreferredBrand(e.target.value)}
        disabled={disabled}
      />
      <button
        onClick={handleBuscar}
        style={buttonStyle}
        disabled={loading || disabled}
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>

      {/* Mostrar animación de carga cuando loading esté activo */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <Player
            autoplay
            loop
            src={LoadingAnimation}
            style={{ height: "150px", width: "150px" }}
          />
        </div>
      )}

      {resultados.length > 0 && !loading && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleReset} style={buttonStyle}>
            Realizar una nueva búsqueda
          </button>
        </div>
      )}
    </div>
  );
}

export default Busqueda;
