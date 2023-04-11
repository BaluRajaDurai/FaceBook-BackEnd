const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

require("dotenv").config();

//mongo db connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo is ready !"))
  .catch((err) => console.log(err));

//declare a basic route
app.get("/", function (request, reply) {
  reply.send({ test: "working" });
});

//using routes
app.use(require("./routes/user"));
app.use(require("./routes/friendlist"));
app.use(require("./routes/post"));
app.use(require("./routes/community"));




//running the port
app.listen(process.env.PORT || 8080, (err) => {
  if (err) throw err;
  console.log(`Server Started at ${new Date()} Running....`);
});
