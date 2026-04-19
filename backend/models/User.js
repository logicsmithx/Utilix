import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
name:String,
email:{type:String,unique:true,trim:true,lowercase:true},
password:String
})
export default mongoose.model('User',userSchema)
