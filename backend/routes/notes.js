import express from 'express'
import {addNote,getNotes,deleteNote} from '../controllers/noteController.js'
import {requireAuth} from '../middlewares/auth.js'
const router=express.Router()
router.use(requireAuth)
router.post('/',addNote)
router.get('/',getNotes)
router.delete('/:id',deleteNote)
export default router
