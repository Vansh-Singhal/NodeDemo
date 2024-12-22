const express = require('express');
const path = require('path');
const app = express();
const userModel = require("./models/user");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/users',async (req,res)=>{
    
    let allUsers = await userModel.find();   
    
    res.render("users",{users:allUsers});
})

app.post("/create",async (req,res)=>{
    let {name,email,image} = req.body;

    let createdUser = await userModel.create({
        name,
        email,
        image
    });

    console.log(createdUser);
    res.redirect("/users");
})

app.get("/edit/:_id",async (req,res)=>{
    let user = await userModel.findOne({_id:req.params._id});
    console.log(user);
    res.render("update",{user:user});
})

app.post("/update/:_id",async (req,res)=>{
    let {name,email,image} = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params._id},{name,email,image});
    console.log(user);
    res.redirect("/users");
})

app.get("/delete/:_id",async (req,res)=>{
    let user = await userModel.findOneAndDelete({_id:req.params._id});
    console.log(user);
    res.redirect("/users");
})

app.listen(3000);