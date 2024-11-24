function Busqueda() {
    const handleBuscar = () => {
      alert("Resultados de ejemplo generados.");
    };
  
    return (
      <div>
        <h1>Búsqueda</h1>
        <input type="text" placeholder="Presupuesto máximo" />
        <input type="text" placeholder="Categoría" />
        <input type="text" placeholder="Marca" />
        <button onClick={handleBuscar}>Buscar</button>
      </div>
    );
  }
  
  export default Busqueda;
  