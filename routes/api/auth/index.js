const router     = require('express').Router();
const controller = require('./auth.controller');
const authMiddleware = require('../../../middlewares/auth'); // 인증 미들웨어

router.post('/register', controller.register);
router.post('/login', controller.login);

router.use('/check', authMiddleware);
router.get('/check', controller.check);

module.exports = router;
