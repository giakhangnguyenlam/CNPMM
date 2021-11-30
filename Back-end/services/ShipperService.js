const Shipper = require('../schemas/ShipperSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel')
const Order  = require('../schemas/OrderSchema')
const User = require('../schemas/UserSchema')
const OrderDetail = require('../schemas/OrderDetailSchema');
const ShipperModel = require('../models/ShipperModel');

var ShipperSignup = (req, res) => {
    Shipper.findOne({username: req.body.username}, (err, user) => {
        if(err) return res.status(404).json({mess: err});
        if(user==null){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) return res.status(404).json({mess: err});
                const user = new Shipper(req.body);
                user.status = "initial";
                user.password = hash;
                user.save((err, result) => {
                    if(err) return res.status(404).json({mess: err});
                    const data = {
                        username: result.username,
                        role: 'ROLE_SHIPPER'
                    }
                    const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
                    let userModel = new UserModel(result.id, result.name, result.dateofbirth, result.email, result.address, result.gender, accessToken, 'ROLE_SHIPPER', result.phone);
                    return res.status(201).json(userModel)
                })
            })
        }
        else{
            res.status(404).json({mess: 'User is already existed'});
        }
    })
} 

var ShipperLogin = (req, res) => {
    Shipper.findOne({username: req.body.username}, (err, user)=> {
        if(err) return res.status(404).json(err)
        if(user!=null){
            if(user.status === "initial"){
                return res.status(404).json({mess: "Tài khoản đang được xác minh vui lòng đợi admin kiểm duyệt"});
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) return res.status(404).json({mess: err});
                if(result === true){
                    const data = {
                        username: user.username,
                        role: 'ROLE_SHIPPER'
                    }
                    const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
                    let userModel = new UserModel(user.id, user.name, user.dateofbirth, user.email, user.address, user.gender, accessToken, 'ROLE_SHIPPER', user.phone);
                    return res.status(200).json(userModel)
                }
                else{
                    return res.status(404).json({mess: 'Username or password is incorrect'});
                }
            })
        }  
        else{
            return res.status(404).json({mess: 'Username or password is incorrect !!!!!'});
        }
    })
}

var updateShipperWithPassword = (req, res) => {
    Shipper.findOne({id: req.params.id}, (err, user) => {
        if(err) return res.status(404).json({mess: err});
        if(user!=null){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err)  return res.status(404).json({mess: err})
                user.password = hash;
                user.save((err, result) => {
                    if(err) return res.status(404).json({mess: err})
                    const data = {
                        username: result.username,
                        role: 'ROLE_SHIPPER'
                    }
                    const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
                    let userModel = new UserModel(result.id, result.name, result.dateofbirth, result.email, result.address, result.gender, accessToken, 'ROLE_SHIPPER', result.phone);
                    return res.status(200).json(userModel)
                })
            })
        }
        else{
            res.status(404).json({mess: "User isn't existed"});
        }
    })
}

var updateShipperWithoutPassword = (req, res, next) => {
    Shipper.findOne({id: req.params.id}, (err, user) => {
        if(err) return res.status(404).json(err);
        if(user!=null){
            user.name = req.body.name;
            user.dateofbirth = req.body.dateofbirth;
            user.email = req.body.email;
            user.address = req.body.address;
            user.gender = req.body.gender;
            user.phone = req.body.phone

            user.save((err, result) => {
                if(err) return res.status(404).json({mess: err})
                    const data = {
                        username: result.username,
                        role: 'ROLE_SHIPPER'
                    }
                    const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
                    let userModel = new UserModel(result.id, result.name, result.dateofbirth, result.email, result.address, result.gender, accessToken, 'ROLE_SHIPPER', result.phone);
                    return res.status(200).json(userModel)
            })
        }
        else{
            return res.status(404).json({mess:"Can't find user"});
        }
    })
}

var getShipperByShipperId = (req, res, next) => {
    Shipper.findOne({id: req.params.id}, (err, user) => {
        if(err) return res.status(404).json(err);
        if(user){
            const data = {
                username: user.username,
                role: 'ROLE_SHIPPER'
            }
            const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
            let userModel = new UserModel(user.id, user.name, user.dateofbirth, user.email, user.address, user.gender, accessToken, 'ROLE_SHIPPER', user.phone);
            return res.status(200).json(userModel)
        }
        else{
            return res.status(404).json({mess: "User isn't existed"})
        }
    })
}


var getAllShipper = (req, res, next) => {
    Shipper.find({}, (err, users) => {
        if(err) return res.status(404).json({mess: err});
        return res.status(200).json(users);
    })
}

var verifyShipper = (req, res, next) => {
    Shipper.findOne({id: req.params.id}, (err, shipper) => {
        if(err) return res.status(404).json({mess:err});
        shipper.status = "enabled";
        shipper.save((err) => {
            if(err) return res.status(404).json({mess: err})
            return res.status(200).json({mess: "Kích hoạt tài khoản thành công"});
        })
    })
}

var getShipperWithoutVerify = (req, res, next) => {
    Shipper.find({status: "initial"}, (err, shippers) => {
        if(err) return res.status(404).json({mess: err});
        return res.status(200).json(shippers);
    })
}

var getAllOrderWithStatusAlready = (req, res, next) => {
    console.log("Go to Shipper orders")
    let shipperModel = [];

    Order.find({orderStatus: "Đơn hàng đã chuẩn bị xong"}, async (err, orders) => {
        if(err) return res.status(404).json({mess: err});
        for (const order of orders) {
            const user = await User.findOne({id: order.userId});
            const orderDetails = await OrderDetail.find({orderId: order.id});
            let description = "";
            for (const orderDetail of orderDetails) {
                description += orderDetail.productName+"x"+orderDetail.quantity+", "
            }
            description = description.substring(0, description.length -2);
            const shipper = new ShipperModel(order.id, user.name, user.address, user.phone, description, order.total);

            shipperModel.push(shipper);
        }

        return res.status(200).json(shipperModel);
    })
}

var receiveOrder = (req, res, next) => {
    Shipper.findOne({id: req.body.shipperId}, (err, shipper) => {
        if(err) return res.status(404).json({mess: err});
        shipper.orders.push(req.body.orderId);
        Order.findOne({id: req.body.orderId}, (err, order) => {
            if(err) return res.status(404).json({mess: err})
            order.orderStatus = "Đang giao hàng";
            order.save((err) => {
                if(err)return res.status(404).json({mess: err})
            })
        })
        shipper.save((err, result) => {
            if(err) return res.status(404).json({mess: err});
            return res.status(201).json({mess: "Nhận đơn hàng thành công"});
        })
    })
}

var deliveryOrder = (req, res, next) => {
    Shipper.findOne({id: req.body.shipperId}, (err, shipper) => {
        if(err) return res.status(404).json({mess: err})
        shipper.orders = shipper.orders.filter(function(item) {
            return item !== req.body.orderId;
        })

        shipper.ordersSuccess.push(req.body.orderId);

        shipper.save((err, result) => {
            if(err) return res.status(404).json({mess: err});
            
            Order.findOne({id: req.body.orderId}, (err, order) => {
                if(err) return res.status(404).json({mess: err})

                order.orderStatus = "Giao hàng thành công";
                order.paymentStatus = "Đã thanh toán";

                order.save((err, result) => {
                    if(err) return res.status(404).json({mess: err})

                    return res.status(201).json({mess: "Giao hàng thành công"});
                })
            })
        })
    })
}

var getOrderOfShipper = (req, res, next) => {

    let shipperModel = [];

    Shipper.findOne({id: req.params.id}, async (err, shipper) => {
        if(shipper.orders.length > 0){
            for (const orderId of shipper.orders) {
                const order = await Order.findOne({id: orderId});
                const user = await User.findOne({id: order.userId});
                const orderDetails = await OrderDetail.find({orderId: order.id});
                let description = "";
                for (const orderDetail of orderDetails) {
                    description += orderDetail.productName+"x"+orderDetail.quantity+", "
                }
                description = description.substring(0, description.length -2);
                const shipper = new ShipperModel(order.id, user.name, user.address, user.phone, description, order.total);
    
                shipperModel.push(shipper);
            }

            return res.status(200).json(shipperModel);

        }
        else{
            return res.status(200).json({mess: "Chưa nhận đơn hàng"});
        }

        
    })
}

var getOrderDeliverySuccess = (req, res, next) =>  {
    let shipperModel = [];

    Shipper.findOne({id: req.params.id}, async (err, shipper) => {
        if(shipper.ordersSuccess.length > 0){
            for (const orderId of shipper.ordersSuccess) {
                const order = await Order.findOne({id: orderId});
                const user = await User.findOne({id: order.userId});
                const orderDetails = await OrderDetail.find({orderId: order.id});
                let description = "";
                for (const orderDetail of orderDetails) {
                    description += orderDetail.productName+"x"+orderDetail.quantity+", "
                }
                description = description.substring(0, description.length -2);
                const shipper = new ShipperModel(order.id, user.name, user.address, user.phone, description, order.total);
    
                shipperModel.push(shipper);
            }

            return res.status(200).json(shipperModel);

        }
        else{
            return res.status(200).json({mess: "Chưa nhận đơn hàng"});
        }

        
    })
}

module.exports = {
    ShipperLogin,
    ShipperSignup,
    updateShipperWithPassword,
    updateShipperWithoutPassword,
    getShipperByShipperId,
    getAllShipper,
    verifyShipper,
    getShipperWithoutVerify,
    getAllOrderWithStatusAlready,
    deliveryOrder,
    receiveOrder,
    getOrderOfShipper,
    getOrderDeliverySuccess
}