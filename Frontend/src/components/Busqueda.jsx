/**
 * @file Busqueda.jsx
 * @description Componente de búsqueda que permite al usuario filtrar productos o resultados 
 * según tres criterios: presupuesto, categoría y marca.
 * @component
 * @example
 * return ( <Busqueda /> )
 */

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
  