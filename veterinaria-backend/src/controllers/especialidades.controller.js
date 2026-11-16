const pool = require('../config/db');

const obtenerEspecialidades = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM especialidades');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener especialidades:', error);
    res.status(500).json({ message: 'Error al obtener las especialidades', error: error.message });
  }
};

const crearEspecialidad = async (req, res) => {
  try {
    const [result] = await pool.query('INSERT INTO especialidades SET ?', [req.body]);
    res.status(201).json({ message: 'Especialidad creada correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al crear especialidad:', error);
    res.status(500).json({ message: 'Error al crear la especialidad', error: error.message });
  }
};

module.exports = {
  obtenerEspecialidades,
  crearEspecialidad,
};
