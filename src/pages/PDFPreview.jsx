import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generarPDF } from '../services/pdfGenerator';
import { crearCasoAPI } from '../services/api';
import { db } from '../services/db';
import HomeButton from '../components/HomeButton';

export default function PDFPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtenemos los datos (pueden venir del formulario nuevo o del historial)
  const datos = location.state?.datos || {
    nombre: "Ana María López", edad: "24", plataforma: "Instagram",
    alias: "@acosador_123", descripcion: "El usuario me ha estado enviando mensajes ofensivos...",
    fechaInicio: "2026-11-01"
  };

  const [descargando, setDescargando] = useState(false);

  const handleDescargarYGuardar = async () => {
    setDescargando(true);
    try {
      generarPDF(datos);
      
      // Si es un caso nuevo, lo guardamos en IndexedDB
      if (!datos.id) {
        const idLocal = await db.incidentes.add({
          ...datos,
          fecha: new Date().toISOString()
        });

        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioContigo'));
        if (usuarioLogueado) {
          await crearCasoAPI('En proceso');
        }
      }
      
      setTimeout(() => {
        setDescargando(false);
        navigate('/contacto');
      }, 1000);

    } catch (error) {
      console.error("Error al procesar el caso:", error);
      alert("El PDF se generó, pero hubo un error al guardarlo en tu historial.");
      setDescargando(false);
    }
  };

  // FUNCIÓN PARA EDITAR: Regresa al formulario con los datos actuales
  const handleEditar = () => {
    navigate('/formulario', { state: { datosAEditar: datos } });
  };

  return (
    <div className="app-wrapper">
      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container">
        
        <header className="inner-header">
          {/* BOTÓN PARA EDITAR (Ahora se llama "Editar datos") */}
          <button className="btn-back" onClick={handleEditar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
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
            <button 
              className="btn-primary" 
              onClick={handleDescargarYGuardar} 
              disabled={descargando} 
              style={{ background: descargando ? '#A78BFA' : 'var(--brand-main)' }}
            >
              {descargando ? 'Guardando caso...' : '📥 Descargar Documento PDF'}
            </button>
            
            <button 
              className="btn-secondary" 
              style={{ marginTop: '15px' }} 
              onClick={() => navigate('/contacto')}
            >
              Continuar con el contacto de abogados
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}