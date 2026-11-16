const express = require('express');
const { obtenerServicios, crearServicio } = require('../controllers/servicios.controller');

const router = express.Router();

router.get('/', obtenerServicios);
router.post('/', crearServicio);

module.exports = router;
