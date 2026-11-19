import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { guardarIncidente } from '../services/db';
import HomeButton from '../components/HomeButton';

export default function Formulario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '', edad: '', telefono: '', correo: '', estadoMunicipio: '',
    esMenor: false, nombreTutor: '', telefonoTutor: '',
    alias: '', enlacePerfil: '', nombreRealAgresor: '', relacion: '',
    fechaInicio: '', frecuencia: '', plataforma: '', tipoConducta: [],
    descripcion: '', accionesTomadas: [],
    personaConoceHechos: '', reportePrevio: ''
  });

  const [evidencias, setEvidencias] = useState([]);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errores[name]) setErrores({ ...errores, [name]: null });
  };

  const handleCheckboxArray = (name, value) => {
    const list = formData[name];
    if (list.includes(value)) {
      setFormData({ ...formData, [name]: list.filter(item => item !== value) });
    } else {
      setFormData({ ...formData, [name]: [...list, value] });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEvidencias([...evidencias, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let nuevosErrores = {};
    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!formData.fechaInicio) nuevosErrores.fechaInicio = "La fecha de inicio es obligatoria.";
    if (!formData.plataforma) nuevosErrores.plataforma = "Selecciona una plataforma.";
    if (!formData.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrores({});
    try {
      await guardarIncidente(formData);
      navigate('/pdf-preview', { state: { datos: formData } });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const cantidadErrores = Object.keys(errores).length;

  return (
    <div className="app-wrapper">
      <div className="aura-bg"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
      <div className="app-container">
        
        <header className="inner-header">
          <button className="btn-back" onClick={() => navigate('/guia-llenado')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px'}}><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
            ¿Dudas? Ver guía
          </button>
          <HomeButton />
        </header>

        <main className="guide-content">
          <h1 className="hero-title" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Formato de Denuncia</h1>
          <p className="panic-subtext" style={{ marginBottom: '30px' }}>Llena lo que sepas. Los campos con * son obligatorios.</p>

          <form onSubmit={handleSubmit} className="form-container" noValidate>
            
            {/* SECCIÓN 1 */}
            <div className="card form-section">
              <h3 className="section-title">1. Tus Datos</h3>
              <div className="input-group">
                <label className="input-label">Nombre completo *</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={`input-field ${errores.nombre ? 'input-error' : ''}`} />
                {errores.nombre && <span className="error-text">{errores.nombre}</span>}
              </div>
              <div className="row-inputs">
                <div className="input-group">
                  <label className="input-label">Edad</label>
                  <input type="number" name="edad" value={formData.edad} onChange={handleChange} className="input-field" />
                </div>
                <div className="input-group">
                  <label className="input-label">Teléfono</label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="input-field" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Correo electrónico</label>
                <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="input-field" />
              </div>
              <div className="input-group">
                <label className="input-label">Estado y Municipio</label>
                <input type="text" name="estadoMunicipio" value={formData.estadoMunicipio} onChange={handleChange} className="input-field" />
              </div>
              <div className="checkbox-group">
                <input type="checkbox" name="esMenor" checked={formData.esMenor} onChange={handleChange} id="menor" />
                <label htmlFor="menor">Soy menor de 18 años</label>
              </div>
              {formData.esMenor && (
                <div style={{ marginTop: '15px', padding: '15px', background: '#F8F6FC', borderRadius: '12px' }}>
                  <label className="input-label">Nombre del tutor</label>
                  <input type="text" name="nombreTutor" value={formData.nombreTutor} onChange={handleChange} className="input-field" />
                  <label className="input-label" style={{ marginTop: '10px' }}>Teléfono del tutor</label>
                  <input type="tel" name="telefonoTutor" value={formData.telefonoTutor} onChange={handleChange} className="input-field" />
                </div>
              )}
            </div>

            {/* SECCIÓN 2 */}
            <div className="card form-section">
              <h3 className="section-title">2. Datos del Agresor (Opcional)</h3>
              <div className="input-group">
                <label className="input-label">Usuario o Alias</label>
                <input type="text" name="alias" value={formData.alias} onChange={handleChange} className="input-field" placeholder="Ej. @usuario_falso" />
              </div>
              <div className="input-group">
                <label className="input-label">Enlace al perfil</label>
                <input type="url" name="enlacePerfil" value={formData.enlacePerfil} onChange={handleChange} className="input-field" placeholder="https://..." />
              </div>
              <div className="input-group">
                <label className="input-label">Nombre real (si lo sabes)</label>
                <input type="text" name="nombreRealAgresor" value={formData.nombreRealAgresor} onChange={handleChange} className="input-field" />
              </div>
              <div className="input-group">
                <label className="input-label">Relación con la persona</label>
                <select name="relacion" value={formData.relacion} onChange={handleChange} className="input-field">
                  <option value="">Selecciona...</option>
                  <option value="Desconocida">Desconocida</option>
                  <option value="Pareja o expareja">Pareja o expareja</option>
                  <option value="Escuela o trabajo">Escuela o trabajo</option>
                  <option value="Amistad o conocida">Amistad o conocida</option>
                  <option value="Familiar">Familiar</option>
                  <option value="No sé quién es">No sé quién es</option>
                </select>
              </div>
            </div>

            {/* SECCIÓN 3 */}
            <div className="card form-section">
              <h3 className="section-title">3. Hechos</h3>
              <div className="row-inputs">
                <div className="input-group">
                  <label className="input-label">Fecha en que empezaron *</label>
                  <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} className={`input-field ${errores.fechaInicio ? 'input-error' : ''}`} />
                  {errores.fechaInicio && <span className="error-text">{errores.fechaInicio}</span>}
                </div>
                <div className="input-group">
                  <label className="input-label">Frecuencia</label>
                  <select name="frecuencia" value={formData.frecuencia} onChange={handleChange} className="input-field">
                    <option value="">...</option>
                    <option value="Una vez">Una vez</option>
                    <option value="Varias veces">Varias veces</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Plataforma o medio *</label>
                <select name="plataforma" value={formData.plataforma} onChange={handleChange} className={`input-field ${errores.plataforma ? 'input-error' : ''}`}>
                  <option value="">Selecciona una plataforma...</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                  <option value="X">X</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Correo">Correo</option>
                  <option value="SMS o llamadas">SMS o llamadas</option>
                  <option value="Juegos en línea">Juegos en línea</option>
                </select>
                {errores.plataforma && <span className="error-text">{errores.plataforma}</span>}
              </div>
              <div className="input-group">
                <label className="input-label">Tipo de conducta (puedes elegir varias)</label>
                <div className="chips-container">
                  {['Amenazas', 'Insultos', 'Imágenes íntimas', 'Suplantación', 'Acoso sexual', 'Extorsión', 'Acceso a cuentas', 'Publicación de datos'].map(tipo => (
                    <button type="button" key={tipo} className={`chip ${formData.tipoConducta.includes(tipo) ? 'chip-active' : ''}`} onClick={() => handleCheckboxArray('tipoConducta', tipo)}>
                      {tipo}
                    </button>
                  ))}
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Describe qué pasó *</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className={`input-field ${errores.descripcion ? 'input-error' : ''}`} rows="5"></textarea>
                {errores.descripcion && <span className="error-text">{errores.descripcion}</span>}
              </div>
            </div>

            {/* SECCIÓN 4 */}
            <div className="card form-section">
              <h3 className="section-title">4. Evidencias (Opcional)</h3>
              <div className="upload-box">
                <input type="file" id="file-upload" multiple accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                <label htmlFor="file-upload" className="upload-label">
                  <span className="upload-icon">📸</span>
                  <p>Adjuntar capturas de pantalla</p>
                  <span className="upload-subtext">Formatos: JPG, PNG</span>
                </label>
              </div>
              {evidencias.length > 0 && <p style={{ marginTop: '10px', color: 'var(--brand-main)', fontWeight: 'bold' }}>{evidencias.length} archivo(s) listo(s)</p>}
            </div>

            {/* SECCIÓN 5 */}
            <div className="card form-section">
              <h3 className="section-title">5. Otros Datos (Opcional)</h3>
              <div className="input-group">
                <label className="input-label">Persona que conoce los hechos</label>
                <input type="text" name="personaConoceHechos" value={formData.personaConoceHechos} onChange={handleChange} className="input-field" />
              </div>
              <div className="input-group">
                <label className="input-label">Reporte previo (Plataforma, escuela o autoridad)</label>
                <input type="text" name="reportePrevio" value={formData.reportePrevio} onChange={handleChange} className="input-field" />
              </div>
            </div>

            {/* PANEL DE ERRORES */}
            {cantidadErrores > 0 && (
              <div className="error-summary">
                <h4>Faltan {cantidadErrores} dato(s) obligatorio(s)</h4>
                <ul>
                  {Object.values(errores).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginBottom: '40px' }}>
              <button type="submit" className="btn-primary">Generar Documento PDF</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}