const router = require('express').Router();
const PExemplarCrtl = require('../Control/PExemplarCrtl');

router.get('/pesq', PExemplarCrtl.pesq);
router.get('/', PExemplarCrtl.getAll);
router.get('/:id', PExemplarCrtl.getById);
// router.delete('/:id', PExemplarCrtl.delById);
// router.patch('/:id', PExemplarCrtl.alter);
// router.post('/', PExemplarCrtl.create);


module.exports = router;