const express=require("express");
const mongoose = require("mongoose");

//create express app
const app = express();

//middleware
app.use(express.json()); 

//database
mongoose.connect('mongodb://localhost/motivation',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', ()=>{
    console.log("connected to mongodb");
})

app.get('/',(req,res)=>{
    res.send("Hello World");
})

const QuotesRoute = require("./routes/Quotes");

app.use('/quotes', QuotesRoute);

//Starting server
app.listen(3000,console.log("listening on port 3000"));

