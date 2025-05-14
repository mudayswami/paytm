const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Account = require('../model/account');
const {signUpValidation, signInValidation, updateValidation} = require('../validation');
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../../config');
const { authMiddleware } = require('./middleware');

router.post("/signup",async (req, res)=>{
    const payload = req.body;
    const validation = signUpValidation.safeParse(payload);
    if(!validation.success){
        return res.status(411).json({
            message:"Validation failed"
        })
    }
    const existingUser = await User.findOne({
        email:payload.email,
    });
    if(existingUser){
        return res.status(411).json({
            message:"Email already in use"
        });
    }

    const user = await User.create({
        email: payload.email,
        name:payload.name,
        password:payload.password
    });
    const userId = user._id;

    const account = await Account.create({
        balance:Math.floor(Math.random()*10000),
        _id : userId
    });

    const token = await jwt.sign({userId},JWT_SECRET);
    console.log(token);
    return res.json({
        message:"User created successfully",
        token:token
    });
});

router.post("/signin", async (req, res) => {
    const payload = req.body;
    const validation = signInValidation.safeParse(payload);
    if(!validation.success){
        return res.status(411).json({
            "message":`Email or Passsword is not Valid`
        });
    }

    const user = await User.findOne({
        "email" : payload.email,
        "password":payload.password
    });
    if(user){
        const token = jwt.sign({id:user._id},JWT_SECRET);
        return res.json({
            token
        });
    }else{
        return res.status(422).json({
            message: "Email or Password doesn't match."
        })
    }

});

router.put("/", authMiddleware , async(req,res) => {
    const payload = req.body;
    const userId = req.userId;

    const validation = updateValidation.safeParse(payload);
    console.log(validation);
    if(!validation.success){
        return res.status(403).json({
            message:"Payload invalid"
        })
    }
    try{
        const user = await User.updateOne({_id:userId},req.body);
        return res.json({
            message:"Update Successfully",
        })
    }catch(err){
        return res.status(403).json({
            message:"Failed to update"
        })
    }

});

router.get("/bulk",authMiddleware , async (req,res)=>{
    const filter = req.query.filter;
    const users = await User.find({
        name:  {
            "$regex" : filter, $options: "i"
        }
    });
    return res.json({
        users:users.map(user => ({
            username: user.name,
            _id:user._id
        }))
    })
});



module.exports = router;