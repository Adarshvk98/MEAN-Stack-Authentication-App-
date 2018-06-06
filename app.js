const express = require('express');
const mongoose=require('mongoose');
const path=require('path');
const bodyparser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const users=require('./routes/user');
const config=require('./config/database');
const app =express();
const port=3000;

//CONNECT DATABASE
mongoose.connect(config.database);
// succecfull connection
mongoose.connection.on('connected',()=>{
  console.log("connected to database "+config.database);
});
// connection error
mongoose.connection.on('error',(err)=>{
  console.log("error occur while connecting to database "+err);
});
//cors midile ware
app.use(cors());

//static path
app.use(express.static(path.join(__dirname,'public')));

//bodyparser midile ware
app.use(bodyparser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//user routes
app.use('/user',users);

app.get('/',(req,res)=>{
  res.send(__dirname);
});
app.listen(port,()=>{
  console.log("server start listen in port "+port);
});
