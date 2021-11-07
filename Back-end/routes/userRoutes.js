const express = require('express');
const router = express.Router();
const {updateUserWithoutPassword,  updateUserWithPassword, getUserByUserId} = require('../services/UserService')
const {createComment} = require('../services/CommentService');
const {createOrder, viewOrderDetailByOrderId, viewOrderHistoryByUserId, payment} = require('../services/OrderServices');


router.put('/:id', updateUserWithoutPassword);

router.put('/password/:id', updateUserWithPassword);

router.get("/:id", getUserByUserId);

router.post('/comment', createComment);

router.post('/order', createOrder);

router.get('/orderhistory/:id', viewOrderHistoryByUserId);

router.get('/orderdetailhistory/:id', viewOrderDetailByOrderId);

router.put('/payment/:id', payment);

module.exports = router;