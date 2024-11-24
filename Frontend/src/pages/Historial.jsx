import { useNavigate } from "react-router-dom";

function Historial() {
  const navigate = useNavigate();
  const historial = ["Búsqueda 1", "Búsqueda 2", "Búsqueda 3"]; // Datos de ejemplo

  const handleSeleccionarBusqueda = (busqueda) => {
    // Redirige a la página de búsqueda con datos prellenados (simulado por ahora)
    navigate("/busqueda", { state: { datos: busqueda } });
  };

  return (
    <div>
      <h1>Historial</h1>
      <ul>
        {historial.map((busqueda, index) => (
          <li key={index} onClick={() => handleSeleccionarBusqueda(busqueda)}>
            {busqueda}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;
