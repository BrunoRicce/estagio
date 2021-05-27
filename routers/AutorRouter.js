const router = require('express').Router();
const AutorCrtl = require('../Control/AutorCrtl');

router.get('/pesq', AutorCrtl.pesq);
router.get('/', AutorCrtl.getAll);
router.get('/:id', AutorCrtl.getById);
router.delete('/:id', AutorCrtl.delById);
router.patch('/:id', AutorCrtl.alter);
router.post('/', AutorCrtl.create);

module.exports = router;