import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generarPDF } from '../services/pdfGenerator';
import HomeButton from '../components/HomeButton';

export default function PDFPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const datos = location.state?.datos || {
    nombre: "Ana María López", edad: "24", plataforma: "Instagram",
    alias: "@acosador_123", descripcion: "El usuario me ha estado enviando mensajes ofensivos...",
    fechaInicio: "2026-11-01"
  };

  const [descargando, setDescargando] = useState(false);

  const handleDescargar = () => {
    setDescargando(true);
    generarPDF(datos);
    setTimeout(() => setDescargando(false), 1500);
  };

  return (
    <div className="app-wrapper">
      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container">
        
        <header className="inner-header">
          <button className="btn-back" onClick={() => navigate('/formulario')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
            Editar datos
          </button>
          <HomeButton />
        </header>

        <main className="guide-content">
          <h1 className="hero-title" style={{ fontSize: '1.8rem', marginBottom: '10px', textAlign: 'center' }}>Vista Previa del Documento</h1>
          <p className="panic-subtext" style={{ textAlign: 'center', marginBottom: '30px' }}>Revisa que la información sea correcta antes de descargar.</p>

          <div className="pdf-paper">
            <div className="pdf-header">
              <h2>Formato de Denuncia por Ciberacoso</h2>
              <p>Contigo · Documento de apoyo para presentar una denuncia</p>
              <p><strong>Folio:</strong> ______________ (lo asigna la autoridad)</p>
              <p><strong>Fecha de elaboración:</strong> {new Date().toLocaleDateString()}</p>
            </div>
            <div className="pdf-section">
              <h3>1. Datos de quien presenta la denuncia</h3>
              <p><strong>Nombre completo:</strong> {datos.nombre}</p>
              <p><strong>Edad:</strong> {datos.edad}</p>
            </div>
            <div className="pdf-section">
              <h3>2. Datos de la persona denunciada</h3>
              <p><strong>Plataforma:</strong> {datos.plataforma}</p>
              <p><strong>Usuario o Alias:</strong> {datos.alias}</p>
            </div>
            <div className="pdf-section">
              <h3>3. Hechos</h3>
              <p><strong>Fecha de inicio:</strong> {datos.fechaInicio}</p>
              <p><strong>Descripción:</strong> {datos.descripcion}</p>
            </div>
            <div className="pdf-signature">
              <p>Declaro bajo protesta de decir verdad que la información presentada es verdadera.</p>
              <br/>
              <p>_________________________________________________</p>
              <p>Nombre y firma de quien presenta la denuncia</p>
            </div>
          </div>

          <div style={{ marginTop: '20px', marginBottom: '40px', width: '100%', maxWidth: '800px' }}>
            <button className="btn-primary" onClick={handleDescargar} disabled={descargando} style={{ background: descargando ? '#A78BFA' : 'var(--brand-main)' }}>
              {descargando ? 'Generando PDF...' : '📥 Descargar Documento PDF'}
            </button>
            <button className="btn-secondary" style={{ marginTop: '15px' }} onClick={() => navigate('/contacto')}>
              Continuar con el contacto de abogados
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}