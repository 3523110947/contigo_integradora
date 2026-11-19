import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

export default function GuiaLlenado() {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container">
        
        <header className="inner-header">
          <button className="btn-back" onClick={() => navigate('/guia-general')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
            Volver
          </button>
          <HomeButton />
        </header>

        <main className="guide-content">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <h1 className="hero-title" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Antes de llenar el formulario</h1>
            <p className="panic-subtext">Te explicamos qué necesitas para que tu denuncia sea válida.</p>
          </div>

          <div className="steps-container">
            <div className="guide-card">
              <div className="guide-number">📝</div>
              <div className="guide-text">
                <h3>Lo que sí necesitas</h3>
                <p>Tu nombre completo, la plataforma donde ocurrió, una descripción de los hechos y la fecha aproximada.</p>
              </div>
            </div>
            <div className="guide-card">
              <div className="guide-number">🙈</div>
              <div className="guide-text">
                <h3>Lo que es opcional</h3>
                <p>Si no conoces el nombre real del agresor, no te preocupes. Con el usuario o alias es suficiente.</p>
              </div>
            </div>
            <div className="guide-card">
              <div className="guide-number">📸</div>
              <div className="guide-text">
                <h3>Sobre las capturas</h3>
                <p>Al final podrás adjuntar imágenes. La app te pedirá permiso para acceder a tu galería solo en ese momento.</p>
              </div>
            </div>
          </div>

          <div className="guide-actions">
            <button className="btn-primary" onClick={() => navigate('/formulario')}>Entendido, ir al formulario</button>
          </div>
        </main>
      </div>
    </div>
  );
}