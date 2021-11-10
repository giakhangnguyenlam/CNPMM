const express = require('express');
const router = express.Router();

const {getAllStore} = require('../services/StoreService');
const {getAllUser} = require('../services/UserService');
const {getAllOrder, getAllOrderWithNonePaymentStatus, payment} = require('../services/OrderServices');
const {getAllSeller} = require('../services/SellerService')
const {getAllProducts} = require('../services/ProductService')

router.get('/stores', getAllStore);

router.get('/sellers', getAllSeller);

router.get('/users', getAllUser);

router.get('/orders', getAllOrder);

router.get('/orders/nonepayment', getAllOrderWithNonePaymentStatus);

router.put('/payment/:id', payment);

router.get('/products', getAllProducts);

module.exports = router;