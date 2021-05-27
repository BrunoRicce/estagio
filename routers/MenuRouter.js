const router = require('express').Router();
const MenuCrtl = require('../Control/MenuCrtl');

router.get('/', MenuCrtl.getAll);

module.exports = router;