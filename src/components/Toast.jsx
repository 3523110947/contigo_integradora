import React, { useEffect } from 'react';

export default function Toast({ mensaje, tipo, onClose }) {
  // Se cierra solo a los 3.5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-container toast-${tipo}`}>
      <div className="toast-icon">
        {tipo === 'success' ? '✅' : '⚠️'}
      </div>
      <p className="toast-message">{mensaje}</p>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
}