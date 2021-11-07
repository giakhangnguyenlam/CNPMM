const Order  =  require('../schemas/OrderSchema');
const OrderDetail = require('../schemas/OrderDetailSchema');
const Product  = require('../schemas/ProductSchema');
const {sendMail} = require('../services/MailService')
const User = require('../schemas/UserSchema');

var createOrder = (req, res, next) => {
    const date = new Date();
    const dateString = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    req.body.orderDate = dateString;
    req.body.orderStatus = "Đặt hàng thành công";
    req.body.paymentStatus = "Chưa thanh toán";
    var order = new Order(req.body);
    
    const listProducts =req.body.listProducts;
    const listQuantities = req.body.listQuantities;
    const listDescription = req.body.listDescription;

    order.save((err, result) => {
        if(err) return res.json({mess: err}).status(404);
        for (let i = 0; i < listProducts.length; i++) {
            var orderDetail = new OrderDetail();
            orderDetail.orderId = result.id;
            orderDetail.productId = listProducts[i];
            orderDetail.quantity = listQuantities[i];
            orderDetail.description = listDescription[i];
            orderDetail.date = dateString;
            orderDetail.status = "Chưa chuẩn bị";

            orderDetail.save((err) => {
                if(err) return res.json({mess: err}).status(404);
            })
        }
        req.body.id = result.id;
        User.findOne({id: req.body.userId}, (err, user) => {
            if(err) return res.json({mess: err}).status(404);
            req.body.email = user.email;
            sendMail(req, res, next);
        })

        
    })

}

var viewOrderHistoryByUserId = (req, res, next) => {
    Order.find({userId: req.params.id}, (err, orders) => {
        if(err) return res.json({mess: err}).status(404);
        res.json(orders).status(200);
    })
}

var viewOrderDetailByOrderId = (req, res, next) => {
    OrderDetail.find({orderId: req.params.id}, (err, orderDetail) => {
        if(err) return res.json({mess: err}).status(404);

        return res.json(orderDetail).status(200) ;
    })
}
 

var getOrderByStoreId = (req, res, next) => {
    Product.find({storeId: req.params.id}, async (err, products) => {
        if(err) return res.json(err);
        let listOrderDetail = [];
        for (const product of products) {
            const obj = await OrderDetail.find({$and: [{productId: product.id},{status: 'Chưa chuẩn bị'}]});
            obj.forEach((o) => {
                listOrderDetail.push(o);
            })
        }
        
        return res.json(listOrderDetail);
    })
}

var getOrderByStoreIdAndDate = (req, res, next) => {
    Product.find({storeId: req.params.id}, async (err, products) => {
        if(err) return res.json(err);
        let listOrderDetail = [];
        for (const product of products) {
            const obj = await OrderDetail.find({$and: [{productId: product.id},{date: req.params.date}]});
            obj.forEach((o) => {
                listOrderDetail.push(o);
            })
        }
        
        return res.json(listOrderDetail);
    })
}

var payment = (req, res, next) => {
    Order.findOne({id: req.params.id}, (err, order) => {
        if(err) return res.json({mess: err}).status(404);
        order.paymentStatus = "Đã thanh toán";
        order.save((err, result) => {
            if(err) return res.json({mess: err}).status(404);
            return res.json({mess: 'Thanh toán thành công'}).status(200);
        })
    })
}

var updateOrderStatus = (req, res, next) => {
    Order.findOne({id: req.params.id}, (err, order) => {
        if(err) return res.json({mess: err}).status(404);
        order.orderStatus = "Đơn hàng đã chuẩn bị xong";
        order.save((err, result) => {
            if(err) return res.json({mess: err}).status(404);
            return res.json({mess: "Update order status successfully"}).status(200);
        })
    })
}

var updateOrderDetailStatus = (req, res, next) => {
    OrderDetail.findOne({id: req.params.id}, (err, orderDetail) => {
        if(err) return res.json({mess: err}).status(404);
        orderDetail.status = "Đang chuẩn bị";
        orderDetail.save((err, result) => {
            if(err)  return res.json({mess: err}).status(200);
            OrderDetail.find({orderId: orderDetail.orderId}, (err, orderDetails) => {
                if(err) return res.json({mess: err}).status(404);
                for (const orderDetail of orderDetails) {
                    if(orderDetail.status === 'Chưa chuẩn bị'){
                        return res.json({mess: 'Update order detail status successfully'}).status(200);
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
        if(err) return res.json({mess: err}).status(404);
        return res.json(orders).status(200);
    })
}

var getAllOrderWithNonePaymentStatus = (req, res, next) => {
    Order.find({paymentStatus: 'Chưa thanh toán'}, (err, orders) => {
        if(err) return res.json({mess: err}).status(404);
        return res.json(orders).status(200);
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
    getAllOrderWithNonePaymentStatus
}