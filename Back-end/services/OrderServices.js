const Order  =  require('../schemas/OrderSchema');
const OrderDetail = require('../schemas/OrderDetailSchema');
const Product  = require('../schemas/ProductSchema');
const {sendMail} = require('../services/MailService')
const User = require('../schemas/UserSchema');
const OrderHistoryModel = require('../models/OrderHistoryModel');

var createOrder = (req, res, next) => {
    let today = new Date();
    let dd  = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth()+1).padStart(2, "0");
    let yyyy = today.getFullYear();
    const dateString = dd+"-"+mm+"-"+yyyy;
    req.body.orderDate = dateString;
    req.body.orderStatus = "Đặt hàng thành công";
    req.body.paymentStatus = "Chưa thanh toán";
    var order = new Order(req.body);
    
    const listProducts =req.body.listProducts;
    const listQuantities = req.body.listQuantities;
    const listDescription = req.body.listDescription;
    const listProductNames = req.body.listProductNames;
    const listPrices = req.body.listPrices;

    order.save((err, result) => {
        if(err) return res.status(404).json({mess: err});
        for (let i = 0; i < listProducts.length; i++) {
            var orderDetail = new OrderDetail();
            orderDetail.orderId = result.id;
            orderDetail.productId = listProducts[i];
            orderDetail.quantity = listQuantities[i];
            orderDetail.description = listDescription[i];
            orderDetail.productName= listProductNames[i];
            orderDetail.price = listPrices[i];
            orderDetail.date = dateString;
            orderDetail.status = "Chưa chuẩn bị";

            orderDetail.save((err) => {
                if(err) return res.status(404).json({mess: err});
            })
        }
        req.body.id = result.id;
        User.findOne({id: req.body.userId}, (err, user) => {
            if(err) return res.status(404).json({mess: err});
            req.body.email = user.email;
            sendMail(req, res, next);
        })

        
    })

}

var createOrderWithPaypal = (req, res, next) => {
        let today = new Date();
        let dd  = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth()+1).padStart(2, "0");
        let yyyy = today.getFullYear();
        const dateString = dd+"-"+mm+"-"+yyyy;
        req.body.orderDate = dateString;
        req.body.orderStatus = "Đặt hàng thành công";
        req.body.paymentStatus = "Đã thanh toán";
        var order = new Order(req.body);
        
        const listProducts =req.body.listProducts;
        const listQuantities = req.body.listQuantities;
        const listDescription = req.body.listDescription;
        const listProductNames = req.body.listProductNames;
        const listPrices = req.body.listPrices;
    
        order.save((err, result) => {
            if(err) return res.status(404).json({mess: err});
            for (let i = 0; i < listProducts.length; i++) {
                var orderDetail = new OrderDetail();
                orderDetail.orderId = result.id;
                orderDetail.productId = listProducts[i];
                orderDetail.quantity = listQuantities[i];
                orderDetail.description = listDescription[i];
                orderDetail.productName= listProductNames[i];
                orderDetail.price = listPrices[i];
                orderDetail.date = dateString;
                orderDetail.status = "Chưa chuẩn bị";
    
                orderDetail.save((err) => {
                    if(err) return res.status(404).json({mess: err});
                })
            }
            req.body.id = result.id;
            User.findOne({id: req.body.userId}, (err, user) => {
                if(err) return res.status(404).json({mess: err});
                req.body.email = user.email;
                sendMail(req, res, next);
            })
    
            
        })
}

var viewOrderHistoryByUserId = (req, res, next) => {

    let orderHistoryModels = [];

    Order.find({userId: req.params.id}, async (err, orders) => {
        if(err) return res.status(404).json({mess: err});
        for (const order of orders) {
            let orderDetail = await OrderDetail.findOne({orderId: order.id});
            let product = orderDetail.productName+"x"+orderDetail.quantity+",...";
            let orderHistory = new OrderHistoryModel(order.id, order.userId, order.orderDate, order.total, order.orderStatus, order.paymentStatus, product);
            orderHistoryModels.push(orderHistory);
        }

        res.status(200).json(orderHistoryModels);
    })

}

var viewOrderDetailByOrderId = (req, res, next) => {
    OrderDetail.find({orderId: req.params.id}, (err, orderDetail) => {
        if(err) return res.status(404).json({mess: err});
        return res.status(200).json(orderDetail) ;
    })
}
 

var getOrderByStoreId = (req, res, next) => {
    Product.find({storeId: req.params.id}, async (err, products) => {
        if(err) return res.status(404).json(err);
        let listOrderDetail = [];
        for (const product of products) {
            const obj = await OrderDetail.find({$and: [{productId: product.id},{status: 'Chưa chuẩn bị'}]});
            obj.forEach((o) => {
                listOrderDetail.push(o);
            })
        }
        
        return res.status(200).json(listOrderDetail);
    })
}

var getOrderByStoreIdAndDate = (req, res, next) => {
    Product.find({storeId: req.params.id}, async (err, products) => {
        if(err) return res.status(404).json(err);
        let listOrderDetail = [];
        for (const product of products) {
            const obj = await OrderDetail.find({$and: [{productId: product.id}, {date: req.params.date}, {status: "Đang chuẩn bị"}]});
            obj.forEach((o) => {
                listOrderDetail.push(o);
            })
        }
        
        return res.status(200).json(listOrderDetail);
    })
}

var payment = (req, res, next) => {
    Order.findOne({id: req.params.id}, (err, order) => {
        if(err) return res.status(404).json({mess: err});
        order.paymentStatus = "Đã thanh toán";
        order.save((err, result) => {
            if(err) return res.status(404).json({mess: err});
            return res.status(200).json({mess: 'Thanh toán thành công'});
        })
    })
}

var updateOrderStatus = (req, res, next) => {
    Order.findOne({id: req.params.id}, (err, order) => {
        if(err) return res.status(404).json({mess: err});
        order.orderStatus = "Đơn hàng đã chuẩn bị xong";
        order.save((err, result) => {
            if(err) return res.status(404).json({mess: err});
            return res.status(200).json({mess: "Update order status successfully"});
        })
    })
}

var updateOrderDetailStatus = (req, res, next) => {
    OrderDetail.findOne({id: req.params.id}, (err, orderDetail) => {
        if(err) return res.status(404).json({mess: err});
        orderDetail.status = "Đang chuẩn bị";
        orderDetail.save((err, result) => {
            if(err)  return res.status(404).json({mess: err});
            OrderDetail.find({orderId: orderDetail.orderId}, (err, orderDetails) => {
                if(err) return res.status(404).json({mess: err});
                for (const orderDetail of orderDetails) {
                    if(orderDetail.status === 'Chưa chuẩn bị'){
                        return res.status(200).json({mess: 'Update order detail status successfully'});
                    }
                }
                req.params.id = orderDetail.orderId;
                updateOrderStatus(req, res, next);
            })
        })
    })
}

var getAllOrder = (req, res, next) => {
    Order.find({}, (err, orders) => {
        if(err) return res.status(404).json({mess: err});
        return res.status(200).json(orders);
    })
}

var getAllOrderWithNonePaymentStatus = (req, res, next) => {
    Order.find({paymentStatus: 'Chưa thanh toán'}, (err, orders) => {
        if(err) return res.status(404).json({mess: err});
        return res.status(200).json(orders);
    })
}

var getOrderByStoreIdAndDateOptions = (req, res, next) => {
    Product.find({storeId: req.params.id}, async (err, products) => {
        if(err) return res.status(404).json(err);
        let listOrderDetail = [];
        for (const product of products) {
        const obj = await OrderDetail.find({$and: [{productId: product.id},{date: {$regex: `-${req.params.month}-${req.params.year}`}},{status: "Đang chuẩn bị"}]});
            obj.forEach((o) => {
                listOrderDetail.push(o);
            })
        }
        
        return res.status(200).json(listOrderDetail);
    })
}

var getOrderByStoreIdAndStatusFinished  = (req, res, next) => {
    Product.find({storeId: req.params.id}, async (err, products) => {
        if(err) return res.status(404).json(err);
        let listOrderDetail = [];
        for (const product of products) {
            const obj = await OrderDetail.find({$and: [{productId: product.id},{status: "Đang chuẩn bị"}]});
            obj.forEach((o) => {
                listOrderDetail.push(o);
            })
        }
        
        return res.status(200).json(listOrderDetail);
    })
}

module.exports = {
    createOrder,
    viewOrderHistoryByUserId,
    viewOrderDetailByOrderId,
    getOrderByStoreId,
    getOrderByStoreIdAndDate,
    payment,
    updateOrderStatus,
    updateOrderDetailStatus,
    getAllOrder,
    getAllOrderWithNonePaymentStatus,
    getOrderByStoreIdAndDateOptions,
    getOrderByStoreIdAndStatusFinished,
    createOrderWithPaypal
}