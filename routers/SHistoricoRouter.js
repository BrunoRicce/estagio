const router = require('express').Router();
const SHistoricoCrtl = require('../Control/SHistoricoCrtl');

router.get('/pesq', SHistoricoCrtl.pesq);
router.get('/:id', SHistoricoCrtl.gerarPdf);
router.get('/', SHistoricoCrtl.getAll);

module.exports = router;