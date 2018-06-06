const jwtStrategy=require('passport-jwt').Strategy;
const Extractjwt=require('passport-jwt').ExtractJwt;
const userModel=require('../model/usermodel');
const config = require('../config/database');

module.exports=function(passport){
  let opt={};
//  opt.jwtFromRequest = Extractjwt.fromAuthHeaderAsBearerToken();
opt.jwtFromRequest = Extractjwt.fromHeader('authorization');
  opt.secretOrKey=config.secret;
  passport.use(new jwtStrategy(opt,(jwt_payload,done)=>{
    //console.log(jwt_payload);
    userModel.getElementById(jwt_payload._id,(err,user)=>{
      if(err){
        return done(err,false);
      }
      if(user){
        return done(null,user);
      }else{
        return done(null,false);
      }
    });
  }));
}
