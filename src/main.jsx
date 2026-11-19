import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { db } from './services/db'; // Importamos nuestra base de datos

// Forzamos la apertura de la base de datos desde que inicia la app
db.open().then(() => {
  console.log("✅ Base de datos IndexedDB lista y abierta.");
}).catch(err => {
  console.error("❌ Error al abrir IndexedDB:", err);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)