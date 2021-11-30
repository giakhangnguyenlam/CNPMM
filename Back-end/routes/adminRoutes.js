const express = require('express');
const router = express.Router();

const {getAllStore} = require('../services/StoreService');
const {getAllUser} = require('../services/UserService');
const {getAllOrder, getAllOrderWithNonePaymentStatus, payment} = require('../services/OrderServices');
const {getAllSeller} = require('../services/SellerService')
const {getAllProducts} = require('../services/ProductService')
const {getShipperWithoutVerify, verifyShipper} = require('../services/ShipperService')

router.get('/stores', getAllStore);

router.get('/sellers', getAllSeller);

router.get('/users', getAllUser);

router.get('/orders', getAllOrder);

router.get('/orders/nonepayment', getAllOrderWithNonePaymentStatus);

router.put('/payment/:id', payment);

router.get('/products', getAllProducts);

router.get('/shipperwithoutverify', getShipperWithoutVerify);

router.put('/verifyshipper/:id', verifyShipper);

module.exports = router;