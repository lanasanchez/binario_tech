const express = require('express');
const router = express.Router();
const scaniaController = require('../controllers/scaniaController');
const validaVin = require('../middlewares/validaVin');

// Rota POST protegida pelo middleware de validação do VIN
router.post('/', validaVin, scaniaController.createTelemetria);

module.exports = router;
