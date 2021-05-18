const router = require('express').Router();
const EditoraCrtl = require('../Control/EditoraCrtl');

router.get('/', EditoraCrtl.getAll);
router.get('/:id', EditoraCrtl.getById);
router.delete('/:id', EditoraCrtl.delById);
router.patch('/:id', EditoraCrtl.alter);
router.post('/', EditoraCrtl.create);


module.exports = router;