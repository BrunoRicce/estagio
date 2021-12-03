const router = require('express').Router();
const SDisponivelCrtl = require('../Control/SDisponivelCrtl');

router.get('/gerar', SDisponivelCrtl.gerarPdf);
router.get('/', SDisponivelCrtl.getAll);
// router.delete('/:id', SDisponivelCrtl.delById);
// router.patch('/:id', SDisponivelCrtl.alter);
// router.post('/', SDisponivelCrtl.create);


module.exports = router;