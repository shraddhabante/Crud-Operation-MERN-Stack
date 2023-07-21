let express=require("express");
let app=express();
let cors=require("cors");
let dbConfig=require("./config/dbConfig");
dbConfig.dbConnection;

let userRouter=require("./router/userRouter");
app.use(cors());
app.use(express.json());

app.use("/api/user",userRouter)

app.listen(3000,()=>console.log("server running on 3000 port number"));