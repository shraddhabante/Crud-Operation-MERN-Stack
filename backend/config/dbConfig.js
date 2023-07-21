let mongoose=require("mongoose");
let url="mongodb://127.0.0.1:27017/userDB";
mongoose.set('strictQuery', false);
let dbConnection=mongoose.connect(url).then(res=>console.log("db Connected")).catch(err=>console.log("error generated"));
module.exports=dbConnection;