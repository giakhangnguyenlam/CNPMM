const jwt = require("jsonwebtoken");

var UserAuthenToken = function(req, res, next){
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    if(!token) res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if(err) res.json({
            err: 'your token is expired'
        })
        if(data.role === 'ROLE_USER' || data.role === 'ROLE_SELLER' || data.role == 'ROLE_ADMIN'){
            next();
        }
        else{
            return res.json({err: 'Not permission'});
        }
    });
}


var SellerAuthenToken = function(req, res, next){
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    if(!token) res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if(err) res.json({
            err: 'your token is expired'
        })
        if(data.role === 'ROLE_SELLER' || data.role == 'ROLE_ADMIN'){
            next();
        }
        else{
            return res.json({err: 'Not permission'});
        }
    });
}

var AdminAuthenToken = function(req, res, next){
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    if(!token) res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if(err) res.json({
            err: 'your token is expired'
        })
        if(data.role == 'ROLE_ADMIN'){
            next();
        }
        else{
            return res.json({err: 'Not permission'});
        }
    });
}

var ShipperAuthenToken = function(req, res, next){
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];
    if(!token) res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if(err) res.json({
            err: 'your token is expired'
        })
        if(data.role =='ROLE_SHIPPER' || data.role == 'ROLE_ADMIN'){

            console.log("Go to Shipper API")
            next();
        }
        else{
            return res.json({err: 'Not permission'});
        }
    });
}

module.exports = {
    UserAuthenToken,
    SellerAuthenToken,
    AdminAuthenToken,
    ShipperAuthenToken
}