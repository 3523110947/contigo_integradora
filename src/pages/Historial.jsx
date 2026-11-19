import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import { db } from '../services/db';
import { obtenerCasosAPI, actualizarEstadoCasoAPI, eliminarCasoAPI } from '../services/api';

export default function Historial() {
  const navigate = useNavigate();
  const [casos, setCasos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarCasos = async () => {
      try {
        const casosServidor = await obtenerCasosAPI();
        const casosLocales = await db.incidentes.toArray();

        const casosUnificados = casosServidor.map(casoServidor => {
          const detalleLocal = casosLocales.find(local => local.id === casoServidor.id);
          return {
            ...casoServidor,
            ...detalleLocal
          };
        });

        setCasos(casosUnificados);
      } catch (error) {
        console.error("Error al cargar casos:", error);
        const locales = await db.incidentes.toArray();
        setCasos(locales);
      } finally {
        setCargando(false);
      }
    };

    cargarCasos();
  }, []);

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarEstadoCasoAPI(id, nuevoEstado);
      setCasos(casos.map(caso => caso.id === id ? { ...caso, estado: nuevoEstado } : caso));
    } catch (error) {
      alert("Error al actualizar el estado. Revisa tu conexión.");
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás segura de eliminar este caso? Esta acción no se puede deshacer.")) {
      try {
        await eliminarCasoAPI(id);
        await db.incidentes.delete(id);
        setCasos(casos.filter(caso => caso.id !== id));
      } catch (error) {
        alert("Error al eliminar el caso.");
      }
    }
  };

  // NUEVA FUNCIÓN: Ver el PDF y opción de editar
  const handleVerPDF = (caso) => {
    // Navegamos a la vista previa del PDF enviando los datos guardados
    navigate('/pdf-preview', { state: { datos: caso } });
  };

  return (
    <div className="app-wrapper">
      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container">
        
        <header className="inner-header">
          <button className="btn-back" onClick={() => navigate('/perfil')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}>
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Volver al Perfil
          </button>
          <HomeButton />
        </header>

        <main className="guide-content">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <h1 className="hero-title" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Mis Casos</h1>
            <p className="panic-subtext">Consulta el estado de tus denuncias y gestiona tus documentos.</p>
          </div>

          {cargando ? (
            <p>Cargando historial...</p>
          ) : casos.length === 0 ? (
            <p className="panic-subtext">Aún no has generado ningún documento de denuncia.</p>
          ) : (
            <div className="cases-list">
              {casos.map((caso) => (
                <div key={caso.id} className="case-card">
                  <div className="case-header">
                    <h3>Caso #{caso.id}</h3>
                    <span className={`case-status status-${(caso.estado || 'En proceso').replace(/\s+/g, '-').toLowerCase()}`}>
                      {caso.estado || 'En proceso'}
                    </span>
                  </div>
                  
                  {/* SOLO MOSTRAMOS LA FECHA DE CREACIÓN Y LA PLATAFORMA */}
                  <p><strong>Fecha de creación:</strong> {new Date(caso.fecha_creacion || caso.fecha).toLocaleDateString()}</p>
                  <p><strong>Plataforma:</strong> {caso.plataforma || 'No especificada'}</p>
                  
                  <div className="case-actions">
                    <select 
                      className="input-field" 
                      style={{ padding: '8px', fontSize: '0.85rem', marginBottom: '10px' }}
                      value={caso.estado || 'En proceso'}
                      onChange={(e) => handleCambiarEstado(caso.id, e.target.value)}
                    >
                      <option value="En proceso">En proceso</option>
                      <option value="Denunciado">Denunciado</option>
                      <option value="Resuelto">Resuelto</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {/* BOTÓN PARA VER EL PDF (Y EDITAR) */}
                      <button 
                        className="btn-primary" 
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        onClick={() => handleVerPDF(caso)}
                      >
                        📄 Ver / Editar PDF
                      </button>

                      <button className="btn-delete" onClick={() => handleEliminar(caso.id)}>
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}