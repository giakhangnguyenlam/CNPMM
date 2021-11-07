const User = require('../schemas/UserSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

var signup = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if(err) return res.json({mess: err});
        if(user==null){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) return res.json({mess: err});
                const user = new User(req.body);
                user.password = hash;
                user.role = "ROLE_USER";
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


var login = (req, res) => {
    User.findOne({username: req.body.username}, (err, user)=> {
        if(err) return res.json(err)
        if(user!=null){
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) return res.json({mess: err});
                if(result === true){
                    const data = {
                        username: user.username,
                        role: user.role
                    }
                    const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
                    let userModel = new UserModel(user.id, user.name, user.dateofbirth, user.email, user.address, user.gender, accessToken, user.role);
                    return res.json(userModel).status(200)
                }
                else{
                    return res.json({mess: 'Username or password is incorrect'});
                }
            })
        }  
        else{
            return res.json({mess: 'Username or password is incorrect !!!!!'});
        }
    })
}

var updateUserWithPassword = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) return res.json({mess: err});
        if(user!=null){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err)  return res.json({mess: err})
                user.password = hash;
                user.save((err, result) => {
                    if(err) return res.json({mess: err})
                    const data = {
                        username: result.username,
                        role: result.role
                    }
                    const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
                    let userModel = new UserModel(result.id, result.name, result.dateofbirth, result.email, result.address, result.gender, accessToken, result.role);
                    return res.json(userModel).status(200)
                })
            })
        }
        else{
            res.json({mess: "User isn't existed"});
        }
    })
}

var updateUserWithoutPassword = (req, res, next) => {
    User.findOne({id: req.params.id}, (err, user) => {
        if(err) return res.json(err);
        if(user!=null){
            user.name = req.body.name;
            user.dateofbirth = req.body.dateofbirth;
            user.email = req.body.email;
            user.address = req.body.address;
            user.gender = req.body.gender;

            user.save((err, result) => {
                if(err) return res.json({mess: err})
                    const data = {
                        username: result.username,
                        role: result.role
                    }
                    const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
                    let userModel = new UserModel(result.id, result.name, result.dateofbirth, result.email, result.address, result.gender, accessToken, result.role);
                    return res.json(userModel).status(200)
            })
        }
        else{
            return res.json({mess:"Can't find user"});
        }
    })
}

var getUserByUserName = (req, res, next) => {
    
}

var getUserByUserId = (req, res, next) => {
    User.findOne({id: req.params.id}, (err, user) => {
        if(err) return res.json(err).status(500);
        if(user){
            const data = {
                username: user.username,
                role: user.role
            }
            const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
            let userModel = new UserModel(user.id, user.name, user.dateofbirth, user.email, user.address, user.gender, accessToken, user.role);
            return res.json(userModel).status(200)
        }
        else{
            return res.json({mess: "User isn't existed"}).status(404)
        }
    })
}

var getAllUser = (req, res, next) => {
    User.find({}, (err, users) => {
        if(err) return res.json({mess: err}).status(404);
        return res.json(users).status(200);
    })
}


module.exports = {
    signup,
    login,
    updateUserWithPassword,
    updateUserWithoutPassword,
    getUserByUserName,
    getUserByUserId,
    getAllUser
}