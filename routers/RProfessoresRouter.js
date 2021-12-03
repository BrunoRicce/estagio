const router = require('express').Router();
const PExemplarCrtl = require('../Control/RProfessoresCrtl');

router.get('/pesq', PExemplarCrtl.pesq);
router.get('/', PExemplarCrtl.getAll);
router.get('/:id', PExemplarCrtl.getById);
router.post('/', PExemplarCrtl.create);


module.exports = router;