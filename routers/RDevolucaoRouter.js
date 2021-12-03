const router = require('express').Router();
const RDevolucaoCrtl = require('../Control/RDevolucaoCrtl');

router.get('/pesq', RDevolucaoCrtl.pesq);
router.get('/pesqex', RDevolucaoCrtl.pesqex);
router.get('/', RDevolucaoCrtl.getAll);
router.get('/:id', RDevolucaoCrtl.getById);
router.get('/exemplares/:id', RDevolucaoCrtl.setExe);
router.get('/delexemplares/:id', RDevolucaoCrtl.delExe);
router.post('/', RDevolucaoCrtl.devolve);


module.exports = router;