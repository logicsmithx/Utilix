import express from 'express'
import {addPassword,getPasswords,deletePassword} from '../controllers/passwordController.js'
import {requireAuth} from '../middlewares/auth.js'
const router=express.Router()
router.use(requireAuth)
router.post('/',addPassword)
router.get('/',getPasswords)
router.delete('/:id',deletePassword)
export default router
