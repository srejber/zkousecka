const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/profile', controller.profile);
router.get('/delete', controller.deleteView);
router.post('/delete', controller.delete);

router.get('/login', controller.loginView);
router.post('/login', controller.login);

router.get('/signup', controller.signupView);
router.post('/signup', controller.signup);

router.get('/logout', controller.logout);

module.exports = router;