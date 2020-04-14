const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.post('/login', userController.signIn);

router.post('/register', userController.register);


module.exports = router;
