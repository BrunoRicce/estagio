const router = require('express').Router();
const AssuntoCrtl = require('../Control/AssuntoCrtl');

router.get('/pesq', AssuntoCrtl.pesq);
router.get('/', AssuntoCrtl.getAll);
router.get('/:id', AssuntoCrtl.getById);
router.delete('/:id', AssuntoCrtl.delById);
router.patch('/:id', AssuntoCrtl.alter);
router.post('/', AssuntoCrtl.create);


module.exports = router;