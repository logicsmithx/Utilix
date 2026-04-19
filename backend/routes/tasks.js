import express from 'express'
import {addTask,getTasks,deleteTask} from '../controllers/taskController.js'
import {requireAuth} from '../middlewares/auth.js'
const router=express.Router()
router.use(requireAuth)
router.post('/',addTask)
router.get('/',getTasks)
router.delete('/:id',deleteTask)
export default router
