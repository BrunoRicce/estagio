const router = require('express').Router();
const LogoutCrtl = require('../Control/LogoutCrtl');

router.get('/', LogoutCrtl.logout);


module.exports = router;