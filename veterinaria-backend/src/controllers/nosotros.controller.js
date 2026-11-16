const pool = require('../config/db');

const obtenerNosotros = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM nosotros');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener registros de nosotros:', error);
    res.status(500).json({ message: 'Error al obtener los registros de nosotros', error: error.message });
  }
};

const crearNosotros = async (req, res) => {
  try {
    const [result] = await pool.query('INSERT INTO nosotros SET ?', [req.body]);
    res.status(201).json({ message: 'Registro de nosotros creado correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al crear registro de nosotros:', error);
    res.status(500).json({ message: 'Error al crear el registro de nosotros', error: error.message });
  }
};

module.exports = {
  obtenerNosotros,
  crearNosotros,
};
