const mongoose=require('mongoose');

const signUpStructure=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    mobile:Number
})

const signupModal=mongoose.model("signin",signUpStructure)
module.exports=signupModal;