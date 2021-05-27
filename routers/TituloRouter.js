const router = require('express').Router();
const TituloCrtl = require('../Control/TituloCrtl');

router.get('/pesq', TituloCrtl.pesq);
router.get('/', TituloCrtl.getAll);
router.get('/:id', TituloCrtl.getById);
router.delete('/:id', TituloCrtl.delById);
router.patch('/:id', TituloCrtl.alter);
router.post('/', TituloCrtl.create);


module.exports = router;