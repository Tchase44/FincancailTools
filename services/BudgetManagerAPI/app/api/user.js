const mongoose = require('mongoose');

const api = {};
// should not exist in production
api.setup = (User)=>(req.res)=>{
    const admin = new User({
        username:'bender',
        password:'benderisgreat',
        clients:[]
    })
    admin.save(error=>{
        if(error){throw error}
        console.log('Admin account setup successfully');
        res.json({success:true});
    })
}

api.index = (User, BudgetToken) => (req,res) =>{
    const token = BudgetToken;

    if(token){
        User.find({},(error, users)=>{
            if(error){thorw error}
            res.status(200).json(users)
        })
    }else{
        return res.status(403).send({success:false, message:'Unauthorized'})
    }
}
api.signUp = (User) = (req,res) =>{
    if(!req.body.username || !req.body.password){
        res.json({success:false,message:'need username and password'})
    }else{
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            clients: []
        })
        newUser.save((error)=>{
            if(error){
                return res.status(400).json({success:false,message:'username exists'})
            }
            res.json({success:true,message:'Account Created'})
        })
    }
} 

module.exports = api;