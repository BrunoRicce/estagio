const router = require('express').Router();
const AnoseirieCrtl = require('../Control/AnoserieCrtl');

// router.get('/pesq', AnoseirieCrtl.pesq);
router.get('/', AnoseirieCrtl.getAll);
router.post('/', AnoseirieCrtl.create);
// router.get('/:id', AnoseirieCrtl.getById);
// router.delete('/:id', AnoseirieCrtl.delById);
// router.patch('/:id', AnoseirieCrtl.alter);



module.exports = router;