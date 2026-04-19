import bcrypt from 'bcrypt'
export async function hashPassword(req,res,next){
if(req.body.password){
const salt=await bcrypt.genSalt(10)
req.body.password=await bcrypt.hash(req.body.password,salt)
}
next()
}