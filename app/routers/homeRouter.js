const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeController');

router.get('/', controller.index);

// Zachycení chyb
router.get('*', (req, res) => res.status(404).redirect('/'));
router.use(controller.error); // Error handler

module.exports = router;
