const mongoose = require("mongoose");

const Friends = new mongoose.Schema(
    {
        email: { type: String, required: true },
        friendREQ: { type: Array },
        friends: { type: Array }
    },
    { collection: "friend-data" },
    { timestamps: true }
);
module.exports = mongoose.model("FriendsData", Friends);
