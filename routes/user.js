const express=require('express');
const userModel=require('../model/usermodel');
const router=express.Router();
const passport=require('passport');
const jwt = require('jsonwebtoken');
const config=require('../config/database');

router.post('/register',(req,res,next)=>{
  let newUser= userModel({
    name:req.body.name,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password
  });
  userModel.addUser(newUser,(err,user)=>{
    if(err){
      res.json({success:false,msg:"failed to register user"});
    }else{
      res.json({success:true,msg:"registed successfully"});
    }
  });
});
router.post('/authenticate',(req,res,next)=>{
  const username=req.body.username;
  const password=req.body.password;
  userModel.getElementByName(username,(err,user)=>{
    if(err)throw err;
    if(!user){
      return res.json({success:false,msg:"user not found"});
    }
    userModel.comparePassword(password,user.password,(err,isMatch)=>{
      if(err) throw err;
      if(isMatch){
        const token=jwt.sign(user.toObject(),config.secret,{
          expiresIn:64800
        });
        res.json({
          success:true,
          token:token,
          user:{
            id:user._id,
            name:user.name,
            email:user.email,
            username:user.username
          }
        });
      }else{
        return res.json({success:false,msg:"wrong password or username"});
      }
    });

  });
});
router.get('/profile',passport.authenticate('jwt', { session: false }),(req,res,next)=>{
  res.json({user:req.user});
});

module.exports = router;
