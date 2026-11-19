import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db.js'; // Ahora lleva la extensión .js
import dotenv from 'dotenv';

dotenv.config(); // Cargamos las variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors()); // Permite que tu React se conecte
app.use(express.json()); // Permite recibir datos en formato JSON

// ==========================================
// MIDDLEWARE: VERIFICAR TOKEN (Rutas protegidas)
// ==========================================
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer TOKEN
    if (!token) return res.status(401).json({ error: 'Acceso denegado. Falta el token.' });

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido o expirado.' });
    }
};

// ==========================================
// RUTAS DE AUTENTICACIÓN
// ==========================================
app.post('/api/register', async (req, res) => {
    const { nombreCompleto, nombreUsuario, correo, password } = req.body;
    if (!nombreCompleto || !nombreUsuario || !correo || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    try {
        const usuarioExiste = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (usuarioExiste.rows.length > 0) {
            return res.status(400).json({ error: 'Este correo ya está registrado.' });
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios (nombre_completo, nombre_usuario, correo, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, correo, nombre_usuario',
            [nombreCompleto, nombreUsuario, correo, passwordHash]
        );
        res.status(201).json({ mensaje: 'Usuario creado con éxito', usuario: nuevoUsuario.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al registrar.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { correo, password } = req.body;
    try {
        const usuario = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        if (usuario.rows.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas.' });
        
        const passwordValido = await bcrypt.compare(password, usuario.rows[0].password_hash);
        if (!passwordValido) return res.status(401).json({ error: 'Credenciales incorrectas.' });

        const token = jwt.sign(
            { id: usuario.rows[0].id, correo: usuario.rows[0].correo }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
        
        res.json({
            token,
            usuario: { 
                id: usuario.rows[0].id, 
                nombre: usuario.rows[0].nombre_completo, 
                usuario: usuario.rows[0].nombre_usuario, 
                correo: usuario.rows[0].correo 
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al iniciar sesión.' });
    }
});

// ==========================================
// RUTAS DE CASOS (METADATOS)
// ==========================================
app.post('/api/casos', verificarToken, async (req, res) => {
    const { estado } = req.body;
    try {
        const nuevoCaso = await pool.query(
            'INSERT INTO casos_metadatos (id_usuario, estado) VALUES ($1, $2) RETURNING id, fecha_creacion, estado',
            [req.usuario.id, estado || 'En proceso']
        );
        res.status(201).json({ mensaje: 'Caso registrado', caso: nuevoCaso.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el caso.' });
    }
});

app.get('/api/casos', verificarToken, async (req, res) => {
    try {
        const casos = await pool.query(
            'SELECT id, fecha_creacion, estado, ultima_actualizacion FROM casos_metadatos WHERE id_usuario = $1 ORDER BY fecha_creacion DESC', 
            [req.usuario.id]
        );
        res.json(casos.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los casos.' });
    }
});

app.put('/api/casos/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        const resultado = await pool.query(
            'UPDATE casos_metadatos SET estado = $1, ultima_actualizacion = CURRENT_TIMESTAMP WHERE id = $2 AND id_usuario = $3 RETURNING *',
            [estado, id, req.usuario.id]
        );
        if (resultado.rows.length === 0) return res.status(404).json({ error: 'Caso no encontrado.' });
        res.json({ mensaje: 'Estado actualizado', caso: resultado.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el caso.' });
    }
});

app.delete('/api/casos/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('DELETE FROM casos_metadatos WHERE id = $1 AND id_usuario = $2 RETURNING *', [id, req.usuario.id]);
        if (resultado.rows.length === 0) return res.status(404).json({ error: 'Caso no encontrado.' });
        res.json({ mensaje: 'Caso eliminado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el caso.' });
    }
});

// INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor de Contigo corriendo en http://localhost:${PORT}`);
});