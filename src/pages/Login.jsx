import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import Toast from '../components/Toast';
import { iniciarSesionAPI } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await iniciarSesionAPI(formData.correo, formData.password);
      
      // Guardamos sesión
      localStorage.setItem('usuarioContigo', JSON.stringify(data));
      
      // Mostramos Toast de bienvenida
      const nombreUsuario = data.usuario.nombre || data.usuario.usuario || 'Usuaria';
      setToast({ mensaje: `¡Bienvenida de nuevo, ${nombreUsuario}!`, tipo: "success" });

      // Redirigimos al HOME (pantalla principal)
      setTimeout(() => {
        navigate('/'); 
      }, 2000);

    } catch (err) {
      setToast({ mensaje: err.message, tipo: "error" });
    }
  };

  return (
    <div className="app-wrapper">
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />}

      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container">
        
        <header className="inner-header">
          <button className="btn-back" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}>
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Volver al inicio
          </button>
          <HomeButton />
        </header>

        <main className="guide-content">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <h1 className="hero-title" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Bienvenida a Contigo</h1>
            <p className="panic-subtext">Inicia sesión para guardar tu progreso.</p>
          </div>

          <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '400px' }}>
            <div className="card form-section">
              <div className="input-group">
                <label className="input-label">Correo Electrónico</label>
                <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="input-field" required />
              </div>

              <div className="input-group">
                <label className="input-label">Contraseña</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" required />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '15px' }}>
                Iniciar Sesión
              </button>

              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                ¿No tienes cuenta? <Link to="/registro" style={{ color: 'var(--brand-main)', fontWeight: 'bold', textDecoration: 'none' }}>Regístrate aquí</Link>
              </p>
            </div>
          </form>

          <div className="anonymous-escape" style={{ marginTop: '20px', marginBottom: '40px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '10px' }}>
              ¿Solo quieres pedir ayuda o aprender sin registrarte?
            </p>
            <button className="btn-secondary" onClick={() => navigate('/')} style={{ borderStyle: 'dashed' }}>
              Continuar en modo anónimo
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}