import React, { useState } from "react";
import { inputStyle, buttonStyle } from "./styles";
import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../../assets/animations/loading.json";
import { useTranslation } from "react-i18next";

/**
 * Componente funcional Busqueda
 * @description Este componente permite al usuario definir criterios de búsqueda (presupuesto máximo, categoría y marca preferida)
 * para recibir recomendaciones de productos.
 * @param {Function} setResultados - Función para actualizar los resultados mostrados, generalmente en el componente padre.
 * @returns {JSX.Element} - El JSX que representa el formulario de búsqueda con los campos de entrada para presupuesto, categoría y marca preferida.
 */
function Busqueda({ setResultados }) {
  const { t } = useTranslation();
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
      setError(t("error.invalid_budget"));
      return;
    }

    if (!category) {
      setError(t("error.select_category"));
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
      setError(t("error.generic"));
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
      <h2>{t("search.title")}</h2>
      <p style={{ marginBottom: "10px" }}>{t("search.description")}</p>

      {error && (
        <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <input
        type="number"
        placeholder={t("search.max_budget")}
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
          {t("search.select_category")}
        </option>
        <option value="computadoras">{t("search.category_computers")}</option>
        <option value="smartphones">{t("search.category_smartphones")}</option>
        <option value="tablets">{t("search.category_tablets")}</option>
        <option value="monitores">{t("search.category_monitors")}</option>
        <option value="accesorios">{t("search.category_accessories")}</option>
        <option value="ram">{t("search.category_ram")}</option>
        <option value="cpu">{t("search.category_cpu")}</option>
        <option value="gpu">{t("search.category_gpu")}</option>
        <option value="psu">{t("search.category_psu")}</option>
        <option value="gabinete">{t("search.category_case")}</option>
        <option value="board">{t("search.category_board")}</option>
        <option value="gadgets">{t("search.category_gadgets")}</option>
        <option value="redes">{t("search.category_network")}</option>
      </select>
      <input
        type="text"
        placeholder={t("search.brand_placeholder")}
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
        {loading ? t("search.searching") : t("search.search")}
      </button>

      {/* Mostrar animación de carga cuando loading esté activo */}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Player
            autoplay
            loop
            src={LoadingAnimation}
            style={{ height: "auto", width: "50%", maxWidth: "300px" }}
          />
        </div>
      )}

      {resultados.length > 0 && !loading && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleReset} style={buttonStyle}>
            {t("search.reset")}
          </button>
        </div>
      )}
    </div>
  );
}

export default Busqueda;
