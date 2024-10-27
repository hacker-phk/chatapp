import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save(); // Save the new user first

        const token = await generateTokenAndSetCookie(newUser._id, res); // Now generate the token

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
            token,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal server error" });
    }

    console.log("signup user");
};



export const login=async(req,res)=>{
    try{
        const {userName,password}=req.body
        const user=await User.findOne({userName})
        console.log(userName,password)
        if(user){
            const isMatch=await bcrypt.compare(password,user.password)
            if(isMatch){
               const temp=await generateTokenAndSetCookie(user._id,res)
               console.log(temp)
                res.status(200).json({
                    _id:user._id,
                    fullName:user.fullName,
                    userName:user.userName,
                    profilePic:user.profilePic,
                    token:temp
                })
            }
            else{
                res.status(400).json({err:"invalid credentials"})
            }
        }
        else{
            res.status(400).json({error:"user not found or invalid "})
        }
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const logout=(req,res)=>{
    try {
       res.cookie("token","",{maxAge:0})
        res.status(200).json({ message: "user logged out" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
}