import Dexie from 'dexie';

// Inicializamos la base de datos local (Caché)
export const db = new Dexie('ContigoAppDB');

// Definimos las tablas y los campos (Versión 3)
db.version(3).stores({
    config: 'key', // Para guardar el saldo de monedas y ajustes en modo anónimo
    incidentes: '++id, nombre, edad, correo, telefono, plataforma, alias, descripcion, fecha', // El expediente (100% local)
    progreso: '++id, cursoId, moduloId, leccionId, completado', // Avance de Academia para anónimos
    usuarios: '++id, correo, nombreUsuario, nombreCompleto, password' // NUEVO: Cuentas locales (temporal)
});

// ==========================================
// 1. FUNCIONES DEL EXPEDIENTE (SIEMPRE LOCAL)
// ==========================================
export const guardarIncidente = async (datos) => {
    try {
        const datosConFecha = {
            ...datos,
            fecha: datos.fecha || new Date().toISOString()
        };
        const id = await db.incidentes.add(datosConFecha);
        return id;
    } catch (error) {
        console.error("Error al guardar en la base de datos:", error);
        throw error;
    }
};

export const obtenerIncidente = async (id) => {
    return await db.incidentes.get(id);
};

// ==========================================
// 2. FUNCIONES DE USUARIO (AUTENTICACIÓN)
// ==========================================

// REGISTRO: Cuando conectes tu servidor de PostgreSQL, esta función 
// deberá hacer un fetch a tu API en lugar de guardar en Dexie.
export const registrarUsuario = async (usuario) => {
    try {
        // --- CÓDIGO TEMPORAL (Hasta conectar el backend) ---
        const existe = await db.usuarios.where({ correo: usuario.correo }).first();
        if (existe) throw new Error("Este correo ya está registrado.");
        const id = await db.usuarios.add(usuario);
        return id;

        // --- CÓDIGO REAL (Para cuando tengas el servidor) ---
        /*
        const respuesta = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });
        if (!respuesta.ok) throw new Error("Error al registrar en el servidor");
        return await respuesta.json();
        */
    } catch (error) {
        throw error;
    }
};

// LOGIN: Igual, cuando conectes el servidor, esto cambiará por un fetch.
export const iniciarSesion = async (correo, password) => {
    try {
        // --- CÓDIGO TEMPORAL (Hasta conectar el backend) ---
        const usuario = await db.usuarios.where({ correo }).first();
        if (!usuario) throw new Error("Correo o contraseña incorrectos.");
        if (usuario.password !== password) throw new Error("Correo o contraseña incorrectos.");
        return usuario;

        // --- CÓDIGO REAL (Para cuando tengas el servidor) ---
        /*
        const respuesta = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, password })
        });
        if (!respuesta.ok) throw new Error("Correo o contraseña incorrectos.");
        const data = await respuesta.json();
        return data; // Aquí el servidor te devolverá los datos del usuario y un Token JWT
        */
    } catch (error) {
        throw error;
    }
};

// ==========================================
// 3. FUNCIONES DE MONEDAS Y PROGRESO
// ==========================================
// Estas funciones manejan la lógica híbrida: si no hay usuario, usan IndexedDB. 
// Si hay usuario, en el futuro se sincronizarán con el servidor.

export const obtenerMonedas = async () => {
    // Buscamos si hay un usuario logueado en la sesión
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioContigo'));
    
    if (usuarioLogueado) {
        // Si hay cuenta, idealmente leemos el saldo del servidor. 
        // Por ahora, lo simulamos leyendo su cuenta o el caché global.
        const config = await db.config.get('monedas');
        return config ? config.value : 0;
    } else {
        // Si es anónimo, leemos de la caché local (IndexedDB)
        const config = await db.config.get('monedas');
        return config ? config.value : 0;
    }
};

export const sumarMonedas = async (cantidad) => {
    const actuales = await obtenerMonedas();
    const nuevoTotal = actuales + cantidad;

    // Siempre guardamos en local (para el anónimo o como respaldo)
    await db.config.put({ key: 'monedas', value: nuevoTotal });

    // Si hay cuenta, aquí harías un fetch al servidor para sumar las monedas
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioContigo'));
    if (usuarioLogueado) {
        // fetch('http://localhost:3000/api/monedas/sumar', ...);
        console.log("Sincronizando monedas con el servidor...");
    }
    
    return nuevoTotal;
};

export const marcarLeccionCompletada = async (cursoId, moduloId, leccionId) => {
    try {
        const yaCompletada = await db.progreso.where({ leccionId }).first();
        
        if (!yaCompletada) {
            await db.progreso.add({ cursoId, moduloId, leccionId, completado: true });
            await sumarMonedas(5); // Da 5 monedas por leer
            return true; 
        }
        return false; 
    } catch (error) {
        console.error("Error al guardar el progreso:", error);
        return false;
    }
};

export const verificarLeccion = async (leccionId) => {
    const leccion = await db.progreso.where({ leccionId }).first();
    return !!leccion; 
};