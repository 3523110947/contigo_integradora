import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

export default function GuiaGeneral() {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container">
        
        <header className="inner-header">
          <button className="btn-back" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
            Volver
          </button>
          <HomeButton />
        </header>

        <main className="guide-content">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <h1 className="hero-title" style={{ fontSize: '2rem', marginBottom: '10px' }}>Respira. Estás a salvo.</h1>
            <p className="panic-subtext">Sigue estos pasos para protegerte y documentar lo que está pasando.</p>
          </div>

          <div className="steps-container">
            <div className="guide-card">
              <div className="guide-number">1</div>
              <div className="guide-text">
                <h3>No respondas</h3>
                <p>No contestes ni borres los mensajes. El silencio evita que el agresor sepa que te afectó.</p>
              </div>
            </div>
            <div className="guide-card">
              <div className="guide-number">2</div>
              <div className="guide-text">
                <h3>Guarda las pruebas</h3>
                <p>Toma capturas de pantalla donde se vea el nombre del agresor, la fecha y el mensaje. No borres nada.</p>
              </div>
            </div>
            <div className="guide-card">
              <div className="guide-number">3</div>
              <div className="guide-text">
                <h3>Bloquea y reporta</h3>
                <p>Usa las herramientas de la red social para bloquear la cuenta y reportarla como acoso.</p>
              </div>
            </div>
            <div className="guide-card">
              <div className="guide-number">4</div>
              <div className="guide-text">
                <h3>Documenta en Contigo</h3>
                <p>Registra lo sucedido en tu expediente seguro para tener un respaldo legal.</p>
              </div>
            </div>
          </div>

          <div className="guide-actions">
            <button className="btn-primary" onClick={() => navigate('/guia-llenado')}>Continuar con la guía</button>
            <button className="btn-secondary" onClick={() => navigate('/formulario')}>Omitir e ir al formulario</button>
          </div>
        </main>
      </div>
    </div>
  );
}