const pool = require('../config/db');

const obtenerServicios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM servicios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ message: 'Error al obtener los servicios', error: error.message });
  }
};

const crearServicio = async (req, res) => {
  try {
    const [result] = await pool.query('INSERT INTO servicios SET ?', [req.body]);
    res.status(201).json({ message: 'Servicio creado correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({ message: 'Error al crear el servicio', error: error.message });
  }
};

module.exports = {
  obtenerServicios,
  crearServicio,
};
