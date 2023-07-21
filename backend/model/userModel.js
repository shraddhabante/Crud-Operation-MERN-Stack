let mongoose=require("mongoose");
mongoose.pluralize(null);
let loginSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        unique:true
    },

})

let loginModel=mongoose.model("userSchema",loginSchema)
module.exports=loginModel;