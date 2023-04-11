const express = require('express')
const app = express();
const {
  verifyToken,
} = require("../middlewares/auth");


const { userAuth , sendReq, acceptReq, deleteFrd,getfriends} = require("../controllers/user");




  app.post("/api/signup_login", userAuth);
  



  
 module.exports = app

