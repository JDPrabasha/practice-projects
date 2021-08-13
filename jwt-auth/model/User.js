const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        reuired:true,
        min:6
    },
    email:{
        type:String,
        reuired:true,
        max:255,
        min:6
    },
    password:{
        type:String,
        reuired:true,
        min:1024,
        min:6
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("User", UserSchema);