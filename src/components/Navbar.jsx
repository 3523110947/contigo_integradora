import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [estaLogueado, setEstaLogueado] = useState(false);

  // Revisamos el localStorage cada vez que cambia la ruta
  useEffect(() => {
    const sesion = localStorage.getItem('usuarioContigo');
    setEstaLogueado(!!sesion); 
  }, [location.pathname]);

  return (
    <footer className="bottom-dock">
      {/* ACADEMIA */}
      <button 
        className={`dock-item ${location.pathname === '/academia' ? 'active' : ''}`} 
        onClick={() => navigate('/academia')}
      >
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
        <span>Academia</span>
      </button>
      
      {/* BROTE */}
      <button 
        className={`dock-item ${location.pathname === '/brote' ? 'active' : ''}`} 
        onClick={() => navigate('/brote')}
      >
        <span style={{ fontSize: '1.2rem', marginBottom: '5px' }}>🌱</span>
        <span>Brote</span>
      </button>

      {/* PERFIL / INGRESAR (Depende de la sesión) */}
      <button 
        className={`dock-item ${(location.pathname === '/perfil' || location.pathname === '/login') ? 'active' : ''}`} 
        onClick={() => navigate(estaLogueado ? '/perfil' : '/login')}
      >
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        <span>{estaLogueado ? 'Perfil' : 'Ingresar'}</span>
      </button>
    </footer>
  );
}