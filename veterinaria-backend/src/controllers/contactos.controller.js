const pool = require('../config/db');

const obtenerContactos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contactos');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ message: 'Error al obtener los contactos', error: error.message });
  }
};

const crearContacto = async (req, res) => {
  try {
    const [result] = await pool.query('INSERT INTO contactos SET ?', [req.body]);
    res.status(201).json({ message: 'Contacto creado correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al crear contacto:', error);
    res.status(500).json({ message: 'Error al crear el contacto', error: error.message });
  }
};

module.exports = {
  obtenerContactos,
  crearContacto,
};
