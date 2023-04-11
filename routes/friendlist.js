const express = require('express')
const app = express();
const {
  verifyToken,
} = require("../middlewares/auth");

const { sendReq, acceptReq, deleteFrd, getAllFriends} = require("../controllers/friendlist");




  app.post("/api/friendlist/sendreq",sendReq);

  app.post("/api/friendlist/acceptreq",acceptReq);

  app.post("/api/friendlist/removefrd", deleteFrd);

  app.get("/api/friendlist/getallfrds/:email", getAllFriends);



  
 module.exports = app

