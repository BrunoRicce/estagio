const router = require('express').Router();
const FAComentarioCrtl = require('../Control/FAComentarioCrtl');

router.get('/pesq', FAComentarioCrtl.pesq);
router.get('/', FAComentarioCrtl.getAll);
router.get('/:id', FAComentarioCrtl.getById);
router.post('/', FAComentarioCrtl.create);


module.exports = router;