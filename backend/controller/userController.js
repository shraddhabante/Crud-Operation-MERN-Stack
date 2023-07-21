let loginModel = require("../model/userModel");
let bcrypt=require("bcryptjs");
let jwt =require("jsonwebtoken")
async function convertPassword(password){
    let salt=await bcrypt.genSalt(10);
    let convertPassword=await bcrypt.hash(password,salt);
    return convertPassword;
}

async function comaprePassword(password,hashPassword){
    let comaprePassword=await bcrypt.compare(password,hashPassword);
    return comaprePassword;
}
//  signup user
let signUp = async (req, res) => {
    try{
        const{name,email,password,phone,address}=req.body;
        if(!name){
            return res.send({msg:"Name is required"})
        }
        if(!email){
            return res.send({msg:"Email is required"})
        }
        if(!password){
            return res.send({msg:"Password is required"})
        }
        if(!phone){
            return res.send({msg:"Phone is required"})
        }
        if(!address){
            return res.send({msg:"Address is required"})
        }
        // check emailId is present or not
        const existingUser=await loginModel.findOne({email})
        // existing user check
        if(existingUser){
            return res.status(200).send({
                success:true,
                msg:"Already register please login",
            })
        }
        // register user
        const hashPassword=await convertPassword(password);
        //save
        const user=await new loginModel({name,email,phone,address,password:hashPassword}).save()
        res.status(201).send({
            success:true,
            msg:"User Register Successfully",
            user
        })

    }catch(error){
        res.status(500).send({
            success:false,
            msg:"Error in Registartion",
            error
        })
    }
}

let signIn=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(404).send({
                success:false,
                msg:"Invalid email or password"
            })
        }
        // check user
        const user=await loginModel.findOne({email})
        if(!user){
            return res.status(400).send({
                success:false,
                msg:"Email is not registered"
            })
        }
        const match=await comaprePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                msg:"Invalid Pasword"
            })
        }
        // token
        const token=jwt.sign({_id:user._id},"secretKey",{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            msg:"Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                adddress: user.address,
              },
            token
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            msg:"Error in Login",
            error
        })
    }
}

// get all users
// const getAllUsers= async (req, res) => {
//     try {
//         const user = await loginModel.find({})
//         res.status(200).send({
//             success: true,
//             msg: "All user list",
//             user
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             msg: "Error while getting all users"
//         })
//     }
// }

let getAllUsers = async (request, response) => {
    try {
        let result = await loginModel.find({});
        var res = JSON.stringify(result)
        response.send(res);
    } catch (err) {
        response.json(err);
    }
}
// update user data
let updateUserById=async(req,res)=>{
    try {
        const result = await loginModel.updateOne({_id:req.params._id}, {$set: req.body});
        if(result.modifiedCount>0){
            res.json({"msg":"Record Updated sucessfully"})
        }else if(result.matchedCount>0){
            res.json({"msg":"Can't update Because Old and new data are same"})
        }else{
            res.json({"msg":"Record not present"})
        }
    } catch (error) {
        res.json(error)
    }
}


// delete user data
const deleteUserById=async(req,res)=>{
    try{
        await loginModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            msg:"User data deleted successfully"
        })
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            mes: "Error while deleting product"
        })
    }
}

module.exports={signUp,signIn,getAllUsers,updateUserById,deleteUserById}