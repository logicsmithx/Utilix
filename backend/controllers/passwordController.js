import Password from '../models/Password.js'
import bcrypt from 'bcrypt'
export async function addPassword(req,res){
const userEmail=req.user?.email
const hashed=await bcrypt.hash(req.body.password,10)
const item=new Password({...req.body,password:hashed,userEmail})
await item.save()
res.json({_id:item._id,site:item.site,username:item.username})
}
export async function getPasswords(req,res){
const userEmail=req.user?.email
const items=await Password.find({userEmail}).select('_id site username')
res.json(items)
}
export async function deletePassword(req,res){
const userEmail=req.user?.email
await Password.findOneAndDelete({_id:req.params.id,userEmail})
res.json({message:"deleted"})
}
