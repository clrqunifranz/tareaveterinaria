const express = require('express');
const { obtenerNosotros, crearNosotros } = require('../controllers/nosotros.controller');

const router = express.Router();

router.get('/', obtenerNosotros);
router.post('/', crearNosotros);

module.exports = router;
