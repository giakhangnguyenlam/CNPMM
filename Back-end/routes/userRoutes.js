const express = require('express');
const router = express.Router();
const {updateUserWithoutPassword,  updateUserWithPassword} = require('../services/UserService')

router.put('/:id', updateUserWithoutPassword);

router.put('/password/:id', updateUserWithPassword);



module.exports = router;