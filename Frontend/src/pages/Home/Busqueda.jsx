import React, { useState } from "react";
import { inputStyle, buttonStyle } from "./styles";
import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnimation from "../../assets/animations/loading.json";
import { useTranslation } from "react-i18next";
import request from "../../services/api";

/**
 * Componente funcional Busqueda
 * @description Este componente permite al usuario definir criterios de búsqueda (presupuesto máximo, categoría, marca preferida, o un producto específico).
 * @param {Function} setResultados - Función para actualizar los resultados mostrados, generalmente en el componente padre.
 * @returns {JSX.Element} - El JSX que representa el formulario de búsqueda.
 */
function Busqueda({ setResultados }) {
  const { t } = useTranslation();
  const [maxBudget, setMaxBudget] = useState("");
  const [category, setCategory] = useState("");
  const [singleProduct, setSingleProduct] = useState(""); // Estado para un producto específico
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultados, setResultadosLocal] = useState([]);
  const [disabled, setDisabled] = useState(false); // Estado para habilitar/deshabilitar campos

  /**
   * Maneja la búsqueda de productos.
   */
  const handleBuscar = async () => {
    setError("");

    // Validaciones
    if (!maxBudget || isNaN(maxBudget) || maxBudget <= 0) {
      setError(t("error.invalid_budget"));
      return;
    }

    if (!singleProduct && !category) {
      setError(t("error.select_category_or_product"));
      return;
    }

    setLoading(true);
    setDisabled(true);

    try {
      const response = await request(
        `/scrape/get-products?nameSearch=${singleProduct || category}&amount=20`,
        "GET",
        null,
        null
      );
      const data = await response.json();

      const productosSimulados = data.products;

      // Filtra los productos por presupuesto, marca y producto específico
      const resultadosFiltrados = productosSimulados.filter((producto) => {
        const matchesBudget = producto.precio <= maxBudget;

        const matchesSingleProduct = singleProduct
          ? producto.nombre.toLowerCase().includes(singleProduct.toLowerCase())
          : true;

        return matchesBudget && matchesSingleProduct;
      });

      setResultadosLocal(resultadosFiltrados);
      setResultados(resultadosFiltrados);
    } catch (err) {
      setError(t("error.generic"));
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  /**
   * Restablece los campos del formulario.
   */
  const handleReset = () => {
    setMaxBudget("");
    setCategory("");
    setSingleProduct("");
    setResultadosLocal([]);
    setResultados([]);
    setDisabled(false);
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
        type="text"
        placeholder={t("search.single_product")}
        style={inputStyle}
        value={singleProduct}
        onChange={(e) => setSingleProduct(e.target.value)}
        disabled={disabled}
      />
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
        disabled={disabled || singleProduct}
      >
        <option value="" disabled>
          {t("search.select_category")}
        </option>
        <option value="computadoras">{t("search.category_computers")}</option>
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
      <button
        onClick={handleBuscar}
        style={buttonStyle}
        disabled={loading || disabled}
      >
        {loading ? t("search.searching") : t("search.search")}
      </button>

      {resultados.length > 0 && !loading && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleReset} style={buttonStyle}>
            {t("search.reset")}
          </button>
        </div>
      )}

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
    </div>
  );
}

export default Busqueda;
