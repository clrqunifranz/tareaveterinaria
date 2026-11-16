const express = require('express');
const { obtenerEspecialidades, crearEspecialidad } = require('../controllers/especialidades.controller');

const router = express.Router();

router.get('/', obtenerEspecialidades);
router.post('/', crearEspecialidad);

module.exports = router;
