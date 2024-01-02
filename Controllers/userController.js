const expressAsyncHandler=require('express-async-handler')
const User=require('../Schema/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const generateJwt=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"});
}

function isValidEmail(email){
    const emailexp=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailexp.test(email)
}
function isValidPassword(password){
    const passwordexp= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordexp.test(password);
}

// user have to reguster
const register=expressAsyncHandler(async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email ||!password){
            return res.json(400).json("enter all the details") 
        }
        if(! isValidEmail(email)){
            return res.status(400).json("email is not valid\n")
        }
        if(!isValidPassword(password)){
            return res.status(400).json("your password input doesn't meet the expection")
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(403).json("user already exists with this email")
        }
        const salt=await bcrypt.genSalt(10);
        const hashpass=await bcrypt.hash(password,salt);

        const u=await User.create({
            name:name,email:email,password:hashpass
        })
        res.status(200).json({
            _id: u._id,
            name: u.name,
            email: u.email,
            token: generateJwt(u._id)
        });
    }catch(error){
        res.status(500).json(error);
    }
})

// reguster user can login now
const login=expressAsyncHandler(async(req,res)=>{
    try{
        const {email,password}=req.body;
        if (!email || !password) {
           return res.status(400).json("Enter all details");
        }
        if(! isValidEmail(email)){
            return res.status(400).json("email is not valid\n")
        }
        if(!isValidPassword(password)){
            return res.status(400).json("your password input doesn't meet the expection")
        }
        const users=await User.findOne({email});
        if(users&&await bcrypt.compare(password,users.password)){
            res.status(200).json({
                _id: users.id,
                name: users.name,
                email: users.email,
                token: generateJwt(users.id),
            });
        }else {
            return res.status(400).json("Wrong credentials");
        }
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
})

// user can see  his profile status
const profile=expressAsyncHandler(async(req,res)=>{
    const {name,email,_id}=req.user
    res.status(200).json({
        _id:_id,
        email:email,
        name:name
    })
})

module.exports={
    register,
    login,
    profile
}