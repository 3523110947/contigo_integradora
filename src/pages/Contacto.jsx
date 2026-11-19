import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/HomeButton';

export default function Contacto() {
  const navigate = useNavigate();

  // Datos de los profesionales (Posteriormente vendrán de tu base de datos)
  const profesionales = [
    {
      id: 1,
      nombre: "Lic. Ana García",
      grado: "Maestría en Derecho Cibernético",
      especialidad: "Especialista en protección de datos personales y atención a víctimas de violencia digital en redes sociales.",
      horario: "Lunes a Viernes: 9:00 AM - 6:00 PM",
      correo: "ana.garcia@abogados.com",
      whatsapp: "5215512345678" // Código de México 52 + número
    },
    {
      id: 2,
      nombre: "Mtra. Laura Jiménez",
      grado: "Psicología Clínica y Forense",
      especialidad: "Acompañamiento emocional y contención en crisis para personas que han sufrido acoso o violencia en entornos digitales.",
      horario: "Martes a Sábado: 10:00 AM - 4:00 PM",
      correo: "laura.psicologia@ayuda.com",
      whatsapp: "5215587654321"
    }
  ];

  // Función para abrir WhatsApp con un mensaje predeterminado
  const contactarWhatsApp = (telefono, nombre) => {
    const mensaje = encodeURIComponent(`Hola ${nombre}, vengo de la aplicación Contigo. Ya cuento con mi documento de denuncia y necesito asesoría para proceder con mi caso.`);
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
  };

  return (
    <div className="app-wrapper">
      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container">
        
        <header className="inner-header">
          <button className="btn-back" onClick={() => navigate('/pdf-preview')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}>
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Volver al PDF
          </button>
          <HomeButton />
        </header>

        <main className="guide-content">
          <div className="text-center" style={{ marginBottom: '30px' }}>
            <h1 className="hero-title" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Red de Apoyo Profesional</h1>
            <p className="panic-subtext">Contacta a un experto para que te acompañe en tu caso.</p>
          </div>

          <div className="professionals-grid">
            {profesionales.map((pro) => (
              <div key={pro.id} className="pro-card-main">
                
                {/* Tarjeta Grande: Nombre y Grado */}
                <div className="pro-header">
                  <h2>{pro.nombre}</h2>
                  <p className="pro-grade">{pro.grado}</p>
                  <p className="pro-specialty">{pro.especialidad}</p>
                </div>

                {/* Tarjeta Pequeña: Horarios */}
                <div className="pro-schedule-card">
                  <div className="pro-icon">🕒</div>
                  <div>
                    <span className="pro-label">Horario de atención</span>
                    <p className="pro-value">{pro.horario}</p>
                  </div>
                </div>

                {/* Recuadros de Contacto */}
                <div className="pro-contact-grid">
                  
                  {/* Correo */}
                  <a href={`mailto:${pro.correo}`} className="contact-box email-box">
                    <div className="pro-icon">✉️</div>
                    <div className="contact-text">
                      <span className="pro-label">Correo Electrónico</span>
                      <p className="pro-value">{pro.correo}</p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <button 
                    onClick={() => contactarWhatsApp(pro.whatsapp, pro.nombre)} 
                    className="contact-box whatsapp-box"
                  >
                    <div className="pro-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '24px', height: '24px'}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.887 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    </div>
                    <div className="contact-text">
                      <span className="pro-label">WhatsApp</span>
                      <p className="pro-value">Enviar mensaje</p>
                    </div>
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* Botón para salir si ya tienen ayuda */}
          <div className="guide-actions" style={{ marginTop: '20px', marginBottom: '40px' }}>
            <button className="btn-secondary" onClick={() => navigate('/')}>
              Ya cuento con un profesional
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}