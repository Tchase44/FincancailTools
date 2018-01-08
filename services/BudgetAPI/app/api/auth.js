const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      config = require('@config');

const api = {}
// two '=' signs ??
api.login = (User) = (req,res) => {
    User.findOne({username: req.body.username}, (error,user)=>{
        if(error){ throw error};
        if(!user){
            res.status(401).send({success:false,message: 'Authentication failed. user not found'});
        }else{
            user.comparePassword(req.body.password, (error,matches)=>{
                if(matches && !error){
                    const token = jwt.sign({user},config.secret);
                    res.json({success: true, message: 'Token granted', token})
                }else{
                    res.status(401).send({success: false, message:'Authentication failed, worng password.'})
                }
            })
        }
    })
}
api.verify = (headers) => {
    if(headers && headers.autherization){
        const split = headers.autherization.split(' ');
        if(split.length === 2){return split[1]}
        else{ return null}
    }else{
        return null
    }
}