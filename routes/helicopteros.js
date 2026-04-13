const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // GET - listar todos los helicópteros
  router.get('/', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM helicopteros ORDER BY id');
      res.json(rows);
    } catch (err) {
      console.error('Error al listar:', err);
      res.status(500).json({ error: 'Error al obtener helicópteros' });
    }
  });

  // GET - obtener un helicóptero por ID
  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const { rows } = await pool.query('SELECT * FROM helicopteros WHERE id = $1', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
      res.json(rows[0]);
    } catch (err) {
      console.error('Error al obtener:', err);
      res.status(500).json({ error: 'Error interno' });
    }
  });

  // POST - crear un nuevo helicóptero
  router.post('/', async (req, res) => {
    const { marca, modelo, anio, precio, disponible } = req.body;
    try {
      const { rows } = await pool.query(
        `INSERT INTO helicopteros (marca, modelo, anio, precio, disponible)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [marca, modelo, anio, precio, disponible ?? true]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error('Error al insertar:', err);
      res.status(500).json({ error: 'Error al agregar helicóptero' });
    }
  });

  // PUT - actualizar helicóptero
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { marca, modelo, anio, precio, disponible } = req.body;
    try {
      const { rows } = await pool.query(
        `UPDATE helicopteros SET marca=$1, modelo=$2, anio=$3, precio=$4, disponible=$5
         WHERE id=$6 RETURNING *`,
        [marca, modelo, anio, precio, disponible, id]
      );
      if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
      res.json(rows[0]);
    } catch (err) {
      console.error('Error al actualizar:', err);
      res.status(500).json({ error: 'Error al actualizar helicóptero' });
    }
  });

  // DELETE - eliminar helicóptero
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pool.query('DELETE FROM helicopteros WHERE id=$1', [id]);
      if (result.rowCount === 0) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Helicóptero eliminado' });
    } catch (err) {
      console.error('Error al eliminar:', err);
      res.status(500).json({ error: 'Error al eliminar helicóptero' });
    }
  });

  return router;
};
