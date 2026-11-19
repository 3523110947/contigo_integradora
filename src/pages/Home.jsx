import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomeButton from '../components/HomeButton';

export default function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // Revisamos si hay sesión iniciada
  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem('usuarioContigo'));
    if (sesion) {
      setUsuario(sesion.usuario || sesion);
    }
  }, []);

  return (
    <div className="app-wrapper">
      <div className="aura-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="app-container">
        <header className="home-header">
          <div className="logo">
            <img src="/logo.png" alt="Contigo" className="app-icon" />
            <span className="logo-text">Contigo</span>
          </div>
          
          {/* BOTÓN DINÁMICO: Si hay usuario, va al perfil. Si no, al login. */}
          <button 
            className="btn-settings" 
            onClick={() => navigate(usuario ? '/perfil' : '/login')}
            title={usuario ? "Ir a mi perfil" : "Iniciar sesión"}
          >
            {usuario ? (
              // Mostramos la inicial del nombre si está logueado
              <span style={{ fontWeight: '900', color: 'var(--brand-main)', fontSize: '1.1rem' }}>
                {usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U'}
              </span>
            ) : (
              // Mostramos el icono de engranaje (o el que quieras para ingresar)
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '24px'}}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </button>
        </header>

        <main className="home-content">
          <div className="text-center">
            <span className="badge">Espacio Seguro</span>
            <h1 className="hero-title">Estamos aquí<br/>para protegerte.</h1>
          </div>

          <div className="panic-wrapper">
            <button className="panic-button" onClick={() => navigate('/guia-general')}>
              <span className="panic-text">ME ESTÁN<br/>ACOSANDO</span>
            </button>
          </div>
          
          <p className="panic-subtext">Toca el botón para iniciar el registro seguro de tu caso</p>
        </main>

        <Navbar />
      </div>
    </div>
  );
}