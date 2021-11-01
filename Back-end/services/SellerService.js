const User = require('../schemas/UserSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel')

var sellerSignup = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if(err) return res.json({mess: err});
        if(user==null){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) return res.json({mess: err});
                const user = new User(req.body);
                user.password = hash;
                user.role = "ROLE_SELLER";
                user.save((err, result) => {
                    if(err) return res.json({mess: err});
                    const data = {
                        username: result.username,
                        role: result.role
                    }
                    const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
                    let userModel = new UserModel(result.id, result.name, result.dateofbirth, result.email, result.address, result.gender, accessToken, result.role);
                    return res.json(userModel).status(201)
                })
            })
        }
        else{
            res.json({mess: 'User is already existed'});
        }
    })
} 

module.exports = {
    sellerSignup
}