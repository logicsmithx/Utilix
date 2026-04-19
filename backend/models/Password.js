import mongoose from 'mongoose'
const passwordSchema=new mongoose.Schema({
site:String,
username:String,
password:String,
userEmail:{type:String,required:true,trim:true,lowercase:true,index:true}
})
export default mongoose.model('Password',passwordSchema)
