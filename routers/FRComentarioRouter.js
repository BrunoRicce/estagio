const router = require('express').Router();
const FRComentarioCrtl = require('../Control/FRComentarioCrtl');

//router.get('/pesq', FRComentarioCrtl.pesq);
router.get('/', FRComentarioCrtl.getAll);
router.get('/:id', FRComentarioCrtl.getById);
router.post('/', FRComentarioCrtl.create);


module.exports = router;