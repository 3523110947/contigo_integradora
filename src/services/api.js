const API_URL = 'http://localhost:3000/api'; 

// Función auxiliar para obtener el token guardado en localStorage
const getToken = () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioContigo'));
    return usuario ? usuario.token : null;
};

// ==========================================
// AUTENTICACIÓN
// ==========================================
export const registrarUsuarioAPI = async (datos) => {
    const respuesta = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    if (!respuesta.ok) throw new Error((await respuesta.json()).error);
    return await respuesta.json();
};

export const iniciarSesionAPI = async (correo, password) => {
    const respuesta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
    });
    if (!respuesta.ok) throw new Error((await respuesta.json()).error);
    return await respuesta.json();
};

// ==========================================
// CASOS (HISTORIAL DE PDFs)
// ==========================================
export const crearCasoAPI = async (estado = 'En proceso') => {
    const respuesta = await fetch(`${API_URL}/casos`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify({ estado })
    });
    if (!respuesta.ok) throw new Error('Error al registrar caso');
    return await respuesta.json();
};

export const obtenerCasosAPI = async () => {
    const respuesta = await fetch(`${API_URL}/casos`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!respuesta.ok) throw new Error('Error al obtener casos');
    return await respuesta.json();
};

export const actualizarEstadoCasoAPI = async (id, nuevoEstado) => {
    const respuesta = await fetch(`${API_URL}/casos/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify({ estado: nuevoEstado })
    });
    if (!respuesta.ok) throw new Error('Error al actualizar caso');
    return await respuesta.json();
};

export const eliminarCasoAPI = async (id) => {
    const respuesta = await fetch(`${API_URL}/casos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!respuesta.ok) throw new Error('Error al eliminar caso');
    return await respuesta.json();
};