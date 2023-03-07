const mongoose = require("mongoose");

const UserDeatilsSchema = new mongoose.Schema(
    {
        username:String,
        email: String,
        phoneNo:String,
    },
    {
        collection:"UserInfo",
    }
);

mongoose.model("UserInfo",UserDeatilsSchema)