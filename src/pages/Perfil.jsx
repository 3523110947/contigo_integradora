import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import Toast from '../components/Toast';

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [toast, setToast] = useState(null);
  const [editando, setEditando] = useState(false);
  
  // Estados para el formulario de edición
  const [formEdicion, setFormEdicion] = useState({ nombre: '', usuario: '', correo: '' });

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem('usuarioContigo'));
    if (sesion) {
      const user = sesion.usuario || sesion;
      setUsuario(user);
      setFormEdicion({ nombre: user.nombre || '', usuario: user.usuario || '', correo: user.correo || '' });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioContigo');
    navigate('/');
  };

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    // En el futuro, aquí harías un PUT al backend para guardar los cambios.
    // Por ahora, actualizamos el localStorage para la demo.
    const sesion = JSON.parse(localStorage.getItem('usuarioContigo'));
    const nuevaSesion = { ...sesion, usuario: { ...sesion.usuario, ...formEdicion } };
    localStorage.setItem('usuarioContigo', JSON.stringify(nuevaSesion));
    
    setUsuario(nuevaSesion.usuario);
    setEditando(false);
    setToast({ mensaje: "Perfil actualizado correctamente", tipo: "success" });
  };

  if (!usuario) return null;

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
            Inicio
          </button>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* BOTÓN DE AJUSTES / EDITAR */}
            <button className="btn-settings" onClick={() => setEditando(true)} title="Editar perfil">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '20px'}}>
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
            <HomeButton />
          </div>
        </header>

        <main className="guide-content">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <h1 className="hero-title" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Mi Perfil</h1>
            <p className="panic-subtext">Administra tu cuenta y revisa tu información.</p>
          </div>

          <div className="profile-card">
            <div className="profile-avatar">
              {usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : '?'}
            </div>
            <h2>{usuario.nombre || 'Usuaria de Contigo'}</h2>
            {/* MOSTRAMOS EL NOMBRE DE USUARIO Y EL CORREO */}
            <p className="profile-username">@{usuario.usuario}</p>
            <p className="profile-email">{usuario.correo}</p>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">0</span>
                <span className="stat-label">Monedas</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">0</span>
                <span className="stat-label">Cursos</span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-primary" onClick={() => navigate('/historial')} style={{ marginBottom: '15px' }}>
              📄 Ver Mis Casos y PDFs
            </button>
            <button className="btn-secondary" onClick={handleCerrarSesion}>
              Cerrar Sesión
            </button>
          </div>
        </main>

        {/* MODAL DE EDICIÓN DE PERFIL */}
        {editando && (
          <div className="modal-overlay" onClick={() => setEditando(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Editar Perfil</h2>
              <form onSubmit={handleGuardarCambios} className="form-container">
                <div className="input-group">
                  <label className="input-label">Nombre Completo</label>
                  <input type="text" value={formEdicion.nombre} onChange={(e) => setFormEdicion({...formEdicion, nombre: e.target.value})} className="input-field" />
                </div>
                <div className="input-group">
                  <label className="input-label">Nombre de Usuario</label>
                  <input type="text" value={formEdicion.usuario} onChange={(e) => setFormEdicion({...formEdicion, usuario: e.target.value})} className="input-field" />
                </div>
                <div className="input-group">
                  <label className="input-label">Correo Electrónico</label>
                  <input type="email" value={formEdicion.correo} onChange={(e) => setFormEdicion({...formEdicion, correo: e.target.value})} className="input-field" />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setEditando(false)}>Cancelar</button>
                  <button type="submit" className="btn-primary">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}