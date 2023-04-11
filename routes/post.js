const express = require('express')
const app = express();
const {
  verifyToken,
} = require("../middlewares/auth");

const { addPost, deletePost, getAllPost } = require("../controllers/post");


  app.post("/api/myprofile/addpost", addPost);

  app.delete("/api/myprofile/deletepost/:post_id", deletePost);

  app.get("/api/myprofile/getallposts/:email", getAllPost);


  // app.get("/api/myprofile/getposts",verifyToken,);

  
 module.exports = app

