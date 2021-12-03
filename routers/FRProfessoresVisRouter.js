const router = require('express').Router();
const FRProfessoresVisCrtl = require('../Control/FRProfessoresVisCrtl');

//router.get('/pesq', FRProfessoresVisCrtl.pesq);
router.get('/', FRProfessoresVisCrtl.getAll);
router.get('/:id', FRProfessoresVisCrtl.getById);
//router.post('/', FRProfessoresVisCrtl.create);


module.exports = router;