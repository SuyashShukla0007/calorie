const express = require('express');
const router = express.Router();
const { postUser , getUser,login,logout} = require('../controller/user');
router.post('/sign', postUser);
router.get('/user',getUser)
router.post('/login',login);
router.post('/logout',logout);
module.exports = router;
