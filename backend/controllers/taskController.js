import Task from '../models/Task.js'
export async function addTask(req,res){
const userEmail=req.user?.email
const task=new Task({...req.body,userEmail})
await task.save()
res.json(task)
}
export async function getTasks(req,res){
const userEmail=req.user?.email
const tasks=await Task.find({userEmail})
res.json(tasks)
}
export async function deleteTask(req,res){
const userEmail=req.user?.email
await Task.findOneAndDelete({_id:req.params.id,userEmail})
res.json({message:"deleted"})
}
