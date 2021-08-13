const express = require("express");
const app = express();
const mongoose = require("mongoose");

//connect db
mongoose.connect('mongodb://localhost/users',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>console.log("db connected"));

// const db = mongoose.connection;

// db.once('open', ()=>{
//     console.log("connected to mongodb");
// })

//import routes
const authRoute = require("./routes/auth");
const postRoute  = require("./routes/posts");

//middleware
app.use(express.json()); 

//route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.listen(3000, console.log("listening on port 3000"));