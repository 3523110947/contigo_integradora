import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import { cursosData } from '../services/cursosData';

export default function Academia() {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container">
        
        <header className="inner-header">
          <button className="btn-back" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}>
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Inicio
          </button>
          <HomeButton />
        </header>

        <main className="guide-content">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <h1 className="hero-title" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Tu Camino de Aprendizaje</h1>
            <p className="panic-subtext">Completa los cursos para desbloquear recompensas y protegerte mejor.</p>
          </div>

          <div className="courses-container">
            {cursosData.map((curso, index) => (
              <div 
                key={curso.id} 
                className="course-card"
                onClick={() => navigate(`/academia/curso/${curso.id}`)}
              >
                <div className="course-header">
                  <span className="course-level">{curso.nivel}</span>
                  {/* Aquí luego mostraremos el % real del progreso */}
                  <span className="course-progress">Progreso: 0%</span>
                </div>
                <h3>{curso.titulo}</h3>
                <p>{curso.descripcion}</p>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}