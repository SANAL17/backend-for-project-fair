// Defne logic function

const users = require("../Models/UserSchema");
const jwt = require ('jsonwebtoken')

// Register logic function
exports.register=async(req,res)=>{
    console.log("inside register function");

    try{
        const {username,password,email} = req.body
        console.log(`${username} ${email} ${password}`);
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(402).json("User Allready Exists")
        }
        else{
            const newUser = new users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save()
            res.status(200).json("user created successfully")
        }


    }
    catch(err){
        res.status(500).json("server error");
       

    }

    
}

// login logic function
exports.login=async(req,res)=>{
    const {email,password} = req.body

    try{
        const user= await users.findOne({email,password})
        if(user){
            const token=jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token})


        }
        else{
            res.status(401).json("Invalid User")
        }
    }
    catch(err){
        res.status(500).json("server error" + err.message);
       

    }
}