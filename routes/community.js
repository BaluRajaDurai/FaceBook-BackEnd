const express = require('express')
const app = express();
const {
  verifyToken,
} = require("../middlewares/auth");


const { getPosts } = require("../controllers/community");


app.get("/api/community/", getPosts);
  



  
module.exports = app