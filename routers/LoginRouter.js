const router = require('express').Router();
const LoginCrtl = require('../Control/LoginCrtl');

router.get('/', LoginCrtl.getAll);
router.post('/', LoginCrtl.login);


module.exports = router;