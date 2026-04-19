import Note from '../models/Note.js'
export async function addNote(req,res){
const userEmail=req.user?.email
const note=new Note({...req.body,userEmail})
await note.save()
res.json(note)
}
export async function getNotes(req,res){
const userEmail=req.user?.email
const notes=await Note.find({userEmail})
res.json(notes)
}
export async function deleteNote(req,res){
const userEmail=req.user?.email
await Note.findOneAndDelete({_id:req.params.id,userEmail})
res.json({message:"deleted"})
}
