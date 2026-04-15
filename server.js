const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();

// 🔥 Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔍 Verificar conexión
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// ✅ Conexión a PostgreSQL (Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// 🔥 PROBAR CONEXIÓN A BD
pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error conexión BD:", err));

// 📌 RUTA BASE
app.get('/', (req, res) => {
  res.send('🚁 API funcionando correctamente 🚁');
});

// 📌 GET TODOS
app.get('/helicopteros', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM helicopteros ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// 📌 POST
app.post('/helicopteros', async (req, res) => {
  try {
    const { marca, modelo, anio, precio, disponible } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO helicopteros (marca, modelo, anio, precio, disponible)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [marca, modelo, anio, precio, disponible ?? true]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("ERROR POST:", err);
    res.status(500).json({ error: 'Error al insertar' });
  }
});

// 📌 PUT
app.put('/helicopteros/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, anio, precio, disponible } = req.body;

    const { rows } = await pool.query(
      `UPDATE helicopteros 
       SET marca=$1, modelo=$2, anio=$3, precio=$4, disponible=$5 
       WHERE id=$6 RETURNING *`,
      [marca, modelo, anio, precio, disponible, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("ERROR PUT:", err);
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// 📌 DELETE
app.delete('/helicopteros/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM helicopteros WHERE id=$1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'No encontrado' });
    }

    res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    console.error("ERROR DELETE:", err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// 🚀 SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
