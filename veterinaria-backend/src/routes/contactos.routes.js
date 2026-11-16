const express = require('express');
const { obtenerContactos, crearContacto } = require('../controllers/contactos.controller');

const router = express.Router();

router.get('/', obtenerContactos);
router.post('/', crearContacto);

module.exports = router;
