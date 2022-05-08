const express = require('express');
const router = express.Router();
const user = require('./user');
const book = require('./book');
const profile = require('./profile');
router.use('/user', user);
router.use('/book', book);
router.use('/profile', profile);
module.exports = router;