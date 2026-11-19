import Dexie from 'dexie';

// Inicializamos la base de datos
export const db = new Dexie('ContigoAppDB');

// Definimos las tablas y los campos
db.version(1).stores({
    config: 'key', // Para guardar el saldo de monedas y ajustes
    incidentes: '++id, nombre, edad, correo, telefono, plataforma, alias, descripcion, fecha' // El expediente
});

// Función para guardar el formulario de denuncia
export const guardarIncidente = async (datos) => {
    try {
        // Agregamos la fecha automáticamente si no viene
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

// Función para obtener un incidente por su ID (útil para el PDF)
export const obtenerIncidente = async (id) => {
    return await db.incidentes.get(id);
};