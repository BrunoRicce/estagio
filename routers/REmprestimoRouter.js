const router = require('express').Router();
const REmprestimoCrtl = require('../Control/REmprestimoCrtl');

router.get('/pesq', REmprestimoCrtl.pesq);
router.get('/pesqex', REmprestimoCrtl.pesqex);
router.get('/', REmprestimoCrtl.getAll);
router.get('/:id', REmprestimoCrtl.getById);
router.get('/exemplares/:id', REmprestimoCrtl.setExe);
router.get('/delexemplares/:id', REmprestimoCrtl.delExe);
// router.delete('/:id', REmprestimoCrtl.delById);
// router.patch('/:id', REmprestimoCrtl.alter);
router.post('/', REmprestimoCrtl.create);


module.exports = router;