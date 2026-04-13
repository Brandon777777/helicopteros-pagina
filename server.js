const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

const helicopterosRoutes = require('./routes/helicopteros');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // ✅ sirve tu frontend

// ✅ Conexión a PostgreSQL usando variable de entorno
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // necesario en Render, Railway, Supabase
  }
});

// ✅ Pasar pool a las rutas
app.use('/helicopteros', helicopterosRoutes(pool));

app.get('/', (req, res) => res.send('🚁 API Tienda de Helicópteros funcionando 🚁'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
