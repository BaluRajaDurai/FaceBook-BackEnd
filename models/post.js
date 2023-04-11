const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    user_id: {type: String, required: true},
    email: { type: String, required: true},
    msg: {type: String},
    media: {type: String},
    public: {type: Boolean,default: true}
  },
  { collection: "user-posts" },
  { timestamps: true }
);

module.exports = mongoose.model("PostData", Post);
