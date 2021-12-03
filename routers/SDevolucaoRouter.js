const router = require('express').Router();
const SDevolucaoCrtl = require('../Control/SDevolucaoCrtl');

router.get('/gerar', SDevolucaoCrtl.gerarPdf);
router.get('/', SDevolucaoCrtl.getAll);
// router.delete('/:id', SDevolucaoCrtl.delById);
// router.patch('/:id', SDevolucaoCrtl.alter);
// router.post('/', SDevolucaoCrtl.create);


module.exports = router;