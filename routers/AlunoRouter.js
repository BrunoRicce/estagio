const router = require('express').Router();
const AlunoCrtl = require('../Control/AlunoCrtl');

router.get('/pesq', AlunoCrtl.pesq);
router.get('/', AlunoCrtl.getAll);
router.get('/:id', AlunoCrtl.getById);
router.delete('/:id', AlunoCrtl.delById);
router.patch('/:id', AlunoCrtl.alter);
router.post('/', AlunoCrtl.create);


module.exports = router;