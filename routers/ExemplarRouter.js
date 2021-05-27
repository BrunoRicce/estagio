const router = require('express').Router();
const ExemplarCrtl = require('../Control/ExemplarCrtl');

router.get('/pesq', ExemplarCrtl.pesq);
router.get('/', ExemplarCrtl.getAll);
router.get('/:id', ExemplarCrtl.getById);
router.delete('/:id', ExemplarCrtl.delById);
router.patch('/:id', ExemplarCrtl.alter);
router.post('/', ExemplarCrtl.create);


module.exports = router;