const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

const helicopterosRoutes = require('./routes/helicopteros');

const app = express();

// 🔥 MIDDLEWARES (IMPORTANTE)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔍 DEBUG (VER QUÉ RECIBE EL SERVIDOR)
app.use((req, res, next) => {
  console.log("Método:", req.method);
  console.log("URL:", req.url);
  console.log("Body:", req.body);
  next();
});

// 📁 FRONTEND
app.use(express.static('public'));

// ✅ CONEXIÓN A POSTGRES
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// ✅ RUTAS
app.use('/helicopteros', helicopterosRoutes(pool));

// 🧪 RUTA DE PRUEBA (CLAVE)
app.post('/test', (req, res) => {
  res.json({ recibido: req.body });
});

// 🟢 RUTA BASE
app.get('/', (req, res) => {
  res.send('🚁 API Tienda de Helicópteros funcionando 🚁');
});

// 🚀 SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
