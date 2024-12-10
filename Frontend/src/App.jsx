/**
 * @file App.jsx
 * @description Componente principal de la aplicación. Este archivo maneja las rutas de navegación 
 * utilizando React Router y renderiza los componentes correspondientes según la URL visitada.
 * @requires react-router-dom - Necesario para gestionar las rutas y la navegación entre páginas.
 * @requires ./pages/Login/Login - Componente que maneja el inicio de sesión del usuario.
 * @requires ./pages/Register/Register - Componente para la creación de un nuevo usuario.
 * @requires ./pages/Home/Home - Componente que muestra la vista principal después de iniciar sesión.
 * @requires ./components/Busqueda - Componente para realizar búsquedas filtradas.
 * @requires ./pages/Historial/Historial - Componente que muestra el historial de búsquedas o interacciones.
 * @requires ./styles/App.css - Archivo de estilos específicos para la aplicación.
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Busqueda from "./components/Busqueda";
import Historial from "./pages/Historial/Historial";
import './styles/App.css';

/**
 * Componente principal que maneja las rutas de la aplicación.
 * Este componente utiliza React Router para renderizar diferentes vistas según la URL.
 * @function App
 * @returns {JSX.Element} El componente `Router` que contiene las rutas de la aplicación.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={ < Home idToken />} />
        <Route path="/busqueda" element={<Busqueda />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </Router>
  );
}

export default App;
