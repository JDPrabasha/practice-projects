const router = require('express').Router();
const User = require("../model/User");
const {registerValidation, loginValidation} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

router.post('/register', async (req,res)=>{

    //validate data before store
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user in db

    const emailExists = await User.findOne({email:req.body.email});

    if(emailExists) return res.status(400).send("Email already exists");

 //hash the password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword

    });

    try{
const savedUser = await user.save();
res.send({user:user._id});
    } catch(err){
        res.status(400).send(err);
    }
})

//login

router.post('/login', async (req,res)=>{

    //validate data before store
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user in db

    const user = await User.findOne({email:req.body.email});

    if(!user) return res.status(400).send("Email doesn't exist");

    //password is correct
const validPass = await bcrypt.compare(req.body.password, user.password);

if(!validPass) return res.status(400).send("Invalid Password");
//create and assign token
const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
res.header("auth-token", token).send(token);
res.send("logged in");



 
})

// router.post('/login', (req,res)=>{
//     res.send("Register");
// })

module.exports = router;