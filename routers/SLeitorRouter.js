const router = require('express').Router();
const SLeitorCrtl = require('../Control/SLeitorCrtl');

router.get('/gerar', SLeitorCrtl.gerarPdf);
router.get('/', SLeitorCrtl.getAll);

module.exports = router;