import User from '../models/User.js'
import bcrypt from 'bcrypt'
import {createAuthToken} from '../middlewares/auth.js'
export async function signup(req,res){
try{
const email=req.body.email?.trim().toLowerCase()
const name=req.body.name?.trim()
if(!name || !email || !req.body.password){
return res.status(400).json({message:"All fields are required"})
}
if(req.body.password.length<8){
return res.status(400).json({message:"Password must be at least 8 characters"})
}
const exists=await User.findOne({email})
if(exists)return res.status(400).json({message:"User exists"})
const user=new User({...req.body,name,email})
await user.save()
res.json({message:"Account created"})
}catch{
res.status(500).json({message:"error"})
}
}
export async function signin(req,res){
try{
const email=req.body.email?.trim().toLowerCase()
const user=await User.findOne({email})
if(!user)return res.status(400).json({message:"Invalid email or password"})
const match=await bcrypt.compare(req.body.password,user.password)
if(!match)return res.status(400).json({message:"Invalid email or password"})
const token=createAuthToken(user)
res.json({message:"success",name:user.name,email:user.email,token})
}catch{
res.status(500).json({message:"error"})
}
}
