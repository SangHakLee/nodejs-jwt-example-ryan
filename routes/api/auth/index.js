const router     = require('express').Router();
const controller = require('./controller');

router.post('/register', controller.register);

module.exports = router;
