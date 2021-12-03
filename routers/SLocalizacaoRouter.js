const router = require('express').Router();
const SLocalizacaoCrtl = require('../Control/SLocalizacaoCrtl');

router.get('/gerar', SLocalizacaoCrtl.gerarPdf);
router.get('/', SLocalizacaoCrtl.getAll);
// router.delete('/:id', SLocalizacaoCrtl.delById);
// router.patch('/:id', SLocalizacaoCrtl.alter);
// router.post('/', SLocalizacaoCrtl.create);


module.exports = router;