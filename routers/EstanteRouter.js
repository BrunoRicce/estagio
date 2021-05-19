const router = require('express').Router();
const EstanteCrtl = require('../Control/EstanteCrtl');

router.get('/', EstanteCrtl.getAll);
router.get('/:id', EstanteCrtl.getById);
router.delete('/:id', EstanteCrtl.delById);
router.patch('/:id', EstanteCrtl.alter);
router.post('/', EstanteCrtl.create);

module.exports = router;