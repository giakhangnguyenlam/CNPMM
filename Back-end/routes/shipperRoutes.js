const express = require('express');
const router = express.Router();

const {deliveryOrder, getAllOrderWithStatusAlready, getOrderOfShipper, getShipperByShipperId, receiveOrder, updateShipperWithPassword, updateShipperWithoutPassword, getOrderDeliverySuccess} = require('../services/ShipperService')

router.get('/:id', getShipperByShipperId);

router.put('/:id', updateShipperWithoutPassword);

router.put('/password/:id', updateShipperWithPassword);

router.get('/', getAllOrderWithStatusAlready);

router.post('/deliveryorder', deliveryOrder);

router.get('/order/:id', getOrderOfShipper);

router.post('/receiveorder', receiveOrder);

router.get('/ordersuccess/:id', getOrderDeliverySuccess);

module.exports = router;