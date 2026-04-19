import mongoose from 'mongoose'
const taskSchema=new mongoose.Schema({
title:String,
description:String,
date:String,
time:String,
completed:Boolean,
userEmail:{type:String,required:true,trim:true,lowercase:true,index:true}
})
export default mongoose.model('Task',taskSchema)
