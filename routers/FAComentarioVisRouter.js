const router = require('express').Router();
const FAComentarioVisCrtl = require('../Control/FAComentarioVisCrtl');

//router.get('/pesq', FAComentarioVisCrtl.pesq);
router.get('/', FAComentarioVisCrtl.getAll);
router.get('/:id', FAComentarioVisCrtl.getById);
router.post('/', FAComentarioVisCrtl.create);


module.exports = router;