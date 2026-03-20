// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const helicopterosRoutes = require('./routes/helicopteros');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // ✅ para servir la parte visual

app.get('/', (req, res) => res.send('🚁 API Tienda de Helicópteros funcionando 🚁'));

app.use('/helicopteros', helicopterosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
