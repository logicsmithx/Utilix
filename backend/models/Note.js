import mongoose from 'mongoose'
const noteSchema=new mongoose.Schema({
title:String,
note:String,
category:String,
userEmail:{type:String,required:true,trim:true,lowercase:true,index:true}
})
export default mongoose.model('Note',noteSchema)
