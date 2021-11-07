const express = require('express');
const router = express.Router();

const {getAllStore} = require('../services/StoreService');
const {getAllUser} = require('../services/UserService');
const {getAllOrder, getAllOrderWithNonePaymentStatus, payment} = require('../services/OrderServices');

router.get('/stores', getAllStore);
router.get('/users', getAllUser);
router.get('/orders', getAllOrder);
router.get('/orders/nonepayment', getAllOrderWithNonePaymentStatus);
router.put('/payment/:id', payment);

module.exports = router;