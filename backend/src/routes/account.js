const express = require("express");
const router = express.Router();
const {authMiddleware} = require('./middleware');
const Account = require('../model/account');
const mongoose = require('mongoose');

router.get('/balance',authMiddleware,async (req,res) => {
    const balance = await Account.findById(req.userId, "balance");
    return res.json({"balance": balance.balance});
});

router.post('/transfer',authMiddleware, async(req, res) =>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount , to} = req.body;
    const userId = req.userId;

    const account = await Account.findOne({_id:userId}, "balance", {session});

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.json({
            message : "Insufficient Balance"
        })
    };

    const toAccount = await Account.findOne({_id:to},null,{session});

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }

    await Account.updateOne({_id : userId}, {$inc:{balance : -amount }}, {session});
    await Account.updateOne({_id : toAccount._id}, {$inc:{balance: amount}}, {session});    

    await session.commitTransaction();
    res.json({message: "Transfer Successful"});
    
});



module.exports = router;