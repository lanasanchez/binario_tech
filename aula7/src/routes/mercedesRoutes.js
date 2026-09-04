const express = require('express');
const router = express.Router();
const mercedesController = require('../controllers/mercedesController');
const validaVin = require('../middlewares/validaVin');

// Rota base: /api/v1/telemetria/mercedes
router.get('/', mercedesController.getCaminhoes);
router.get('/:id', mercedesController.getCaminhaoById);

// Aplicação do middleware no POST
router.post('/', validaVin, mercedesController.createCaminhao);

router.put('/:id', mercedesController.updateCaminhao);
router.delete('/:id', mercedesController.deleteCaminhao);

module.exports = router;
