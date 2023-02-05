const express = require("express"); //import express
const app = express();
const mongoose = require("mongoose"); //import mongoose
app.use(express.json());


const mongoUrl = "mongodb+srv://fhlapp:fhlapp@fhlappdb.dumuziw.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{console.log("Connected to Database in MongoDB");})
.catch(e=>console.log(e))

app.listen(5000,()=>{
    console.log("Server Started")
});

app.post("/post",async(req,res)=>{
    console.log(req.body);
    const {data}=req.body;

    try{
        if(data == "Tasnim_test1"){
            res.send({status:"Received from Postman"})
        }
        else {
            res.send({status:"Data not found/correct"})
        }

    } catch (error){
        res.send({status:"Error"})
    }
});

require("./userDetails");

const User= mongoose.model("UserInfo");

app.post("/register",async(req,res)=>{
    const {name,email,mobileNo} = req.body;
    try{
        await User.create({
            username:name,
            email,
            phoneNo: mobileNo,
        });
        res.send({status:"Received successfully from postman"});


    } catch(error) {
        res.send({status:"Error"});
    }
});
