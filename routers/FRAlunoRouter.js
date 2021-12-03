const router = require('express').Router();
const FRAlunoCrtl = require('../Control/FRAlunoCrtl');

// router.get('/pesq', FRAlunoCrtl.pesq);
router.get('/', FRAlunoCrtl.getAll);
// router.get('/:id', FRAlunoCrtl.getById);
// router.delete('/:id', PExemplarCrtl.delById);
// router.patch('/:id', PExemplarCrtl.alter);
// router.post('/', PExemplarCrtl.create);


module.exports = router;