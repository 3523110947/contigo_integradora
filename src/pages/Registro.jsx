import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import Toast from '../components/Toast'; // Importamos el Toast
import { registrarUsuarioAPI } from '../services/api';

export default function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    nombreCompleto: '', nombreUsuario: '', correo: '', password: '', confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mostrarTerminos, setMostrarTerminos] = useState(false);
  
  // Estado para la notificación
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!aceptaTerminos) {
      setToast({ mensaje: "Debes aceptar los Términos y Condiciones.", tipo: "error" });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setToast({ mensaje: "Las contraseñas no coinciden.", tipo: "error" });
      return;
    }
    if (formData.password.length < 8) {
      setToast({ mensaje: "La contraseña debe tener al menos 8 caracteres.", tipo: "error" });
      return;
    }

    try {
      await registrarUsuarioAPI({
        nombreCompleto: formData.nombreCompleto,
        nombreUsuario: formData.nombreUsuario,
        correo: formData.correo,
        password: formData.password
      });
      
      // Éxito: Mostramos toast y redirigimos al login
      setToast({ mensaje: "¡Cuenta creada con éxito! Redirigiendo...", tipo: "success" });
      setTimeout(() => navigate('/login'), 2000); 

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
          <button className="btn-back" onClick={() => navigate('/login')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}>
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Volver
          </button>
          <HomeButton />
        </header>

        <main className="guide-content">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <h1 className="hero-title" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Crea tu cuenta</h1>
            <p className="panic-subtext">Únete para guardar tu progreso y proteger tus datos.</p>
          </div>

          <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '500px' }}>
            <div className="card form-section">
              
              {error && <div className="error-text" style={{ marginBottom: '15px' }}>⚠️ {error}</div>}

              <div className="input-group">
                <label className="input-label">Nombre Completo</label>
                <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} className="input-field" required />
              </div>

              <div className="input-group">
                <label className="input-label">Nombre de Usuario</label>
                <input type="text" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange} className="input-field" required />
              </div>

              <div className="input-group">
                <label className="input-label">Correo Electrónico</label>
                <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="input-field" required />
              </div>

              <div className="row-inputs">
                <div className="input-group">
                  <label className="input-label">Contraseña</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Confirmar Contraseña</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-field" required />
                </div>
              </div>

              <div className="checkbox-group" style={{ marginTop: '20px', alignItems: 'flex-start' }}>
                <input type="checkbox" id="terminos" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} style={{ marginTop: '4px' }} />
                <label htmlFor="terminos" style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.4' }}>
                  Acepto los <button type="button" onClick={() => setMostrarTerminos(true)} style={{ background: 'none', border: 'none', color: 'var(--brand-main)', fontWeight: 'bold', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>Términos y Condiciones</button> y el Aviso de Privacidad.
                </label>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>Crear Cuenta</button>

              <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--brand-main)', fontWeight: 'bold', textDecoration: 'none' }}>Inicia sesión aquí</Link>
              </p>
            </div>
          </form>
        </main>

        {/* MODAL DE TÉRMINOS (Igual que antes) */}
        {mostrarTerminos && (
          <div className="modal-overlay" onClick={() => setMostrarTerminos(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Términos y Privacidad</h2>
              <div className="modal-body">
                <p><strong>1. Uso opcional de la cuenta:</strong> No es obligatorio crear una cuenta para usar Contigo.</p>
                <p><strong>2. Datos que guarda el servidor:</strong> Correo, usuario y contraseña encriptada.</p>
                <p><strong>3. Datos que NUNCA salen de tu dispositivo:</strong> Descripciones, capturas y PDFs.</p>
              </div>
              <button className="btn-primary" onClick={() => { setMostrarTerminos(false); setAceptaTerminos(true); }}>Entendido</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}