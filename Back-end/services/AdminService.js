const Admin  = require('../schemas/AdminSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

var adminSignUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.status(404).json({mess: err});
        var admin =  new Admin(req.body);
        admin.password = hash;
        admin.save((err, result) => {
            if(err) return res.status(404).json({mess: err});
            const data = {
                username: result.username,
                role: 'ROLE_ADMIN'
            }
            const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
            let userModel = {
                ...data,
                accessToken
            }
            return res.status(201).json(userModel)
        })
    })
}

var adminLogin = (req, res, next) => {
    Admin.findOne({username: req.body.username}, (err, user)=> {
        if(err) return res.status(404).json(err)
        if(user!=null){
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) return res.status(404).json({mess: err});
                if(result === true){
                    const data = {
                        username: user.username,
                        role: 'ROLE_ADMIN'
                    }
                    const accessToken =  jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn:"24h"});
                    let userModel = {
                        ...data,
                        accessToken
                    }
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

module.exports = {
    adminSignUp,
    adminLogin
}