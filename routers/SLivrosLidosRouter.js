const router = require('express').Router();
const SLivrosLidosCrtl = require('../Control/SLivrosLidosCrtl');

router.post('/', SLivrosLidosCrtl.gerarPdf);
router.get('/', SLivrosLidosCrtl.getAll);

module.exports = router;