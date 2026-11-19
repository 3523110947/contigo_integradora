import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// --- 1. IMPORTACIÓN DE TODAS LAS PANTALLAS REALES ---
import Home from './pages/Home';
import GuiaGeneral from './pages/GuiaGeneral';
import GuiaLlenado from './pages/GuiaLlenado';
import Formulario from './pages/Formulario';
import PDFPreview from './pages/PDFPreview';
import Contacto from './pages/Contacto';
import Academia from './pages/Academia';

// --- 2. PANTALLA TEMPORAL PARA LO QUE FALTA (Academia, Brote, Ajustes) ---
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
        <Route path="/academia" element={<Academia />} />
        
        {/* PANTALLA DE CONTACTO CONECTADA */}
        <Route path="/contacto" element={<Contacto />} />

        {/* =========================================
            RUTAS DEL MENÚ INFERIOR (PENDIENTES)
           ========================================= */}
        <Route path="/brote" element={<EnConstruccion nombre="Brote (Mascota)" />} />
        <Route path="/ajustes" element={<EnConstruccion nombre="Ajustes" />} />
        
        {/* =========================================
            RUTAS DE USUARIO (PENDIENTES)
           ========================================= */}
        <Route path="/login" element={<EnConstruccion nombre="Inicio de Sesión" />} />
        <Route path="/registro" element={<EnConstruccion nombre="Registro de Cuenta" />} />
        <Route path="/perfil" element={<EnConstruccion nombre="Mi Perfil" />} />

        {/* Ruta de error 404 */}
        <Route path="*" element={<EnConstruccion nombre="Página no encontrada" />} />
      </Routes>
    </Router>
  );
}

export default App;