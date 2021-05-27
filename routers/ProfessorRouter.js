const router = require('express').Router();
const ProfessorCrtl = require('../Control/ProfessorCrtl');

router.get('/pesq', ProfessorCrtl.pesq);
router.get('/', ProfessorCrtl.getAll);
router.get('/:id', ProfessorCrtl.getById);
router.delete('/:id', ProfessorCrtl.delById);
router.patch('/:id', ProfessorCrtl.alter);
router.post('/', ProfessorCrtl.create);


module.exports = router;