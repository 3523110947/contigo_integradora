import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// --- 1. IMPORTACIÓN DE PANTALLAS PRINCIPALES ---
import Home from './pages/Home';
import GuiaGeneral from './pages/GuiaGeneral';
import GuiaLlenado from './pages/GuiaLlenado';
import Formulario from './pages/Formulario';
import PDFPreview from './pages/PDFPreview';
import Contacto from './pages/Contacto';
import Academia from './pages/Academia';

// --- 2. IMPORTACIÓN DE PANTALLAS DE USUARIO ---
import Login from './pages/Login';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import Historial from './pages/Historial';

// --- 3. PANTALLA TEMPORAL (Solo para lo que falta: Brote y Ajustes) ---
const EnConstruccion = ({ nombre }) => {
  const navigate = useNavigate();
  return (
    <div className="app-wrapper">
      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '2rem', marginBottom: '20px' }}>🚧 {nombre}</h1>
        <p className="panic-subtext">Esta pantalla estará lista muy pronto en el nuevo flujo de Contigo.</p>
        <button className="btn-primary" style={{ marginTop: '30px', maxWidth: '300px' }} onClick={() => navigate(-1)}>
          Volver atrás
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* =========================================
            FLUJO PRINCIPAL (EMERGENCIA Y DENUNCIA)
           ========================================= */}
        <Route path="/" element={<Home />} />
        <Route path="/guia-general" element={<GuiaGeneral />} />
        <Route path="/guia-llenado" element={<GuiaLlenado />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/pdf-preview" element={<PDFPreview />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* =========================================
            ACADEMIA
           ========================================= */}
        <Route path="/academia" element={<Academia />} />
        {/* Aquí irán las rutas de CursoDetalle y Leccion cuando las creemos */}

        {/* =========================================
            USUARIO Y CUENTA
           ========================================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/historial" element={<Historial />} />

        {/* =========================================
            RUTAS PENDIENTES
           ========================================= */}
        <Route path="/brote" element={<EnConstruccion nombre="Brote (Mascota)" />} />
        <Route path="/ajustes" element={<EnConstruccion nombre="Ajustes" />} />

        {/* Ruta de error 404 */}
        <Route path="*" element={<EnConstruccion nombre="Página no encontrada" />} />
      </Routes>
    </Router>
  );
}

export default App;