import express from 'express'
import {signup,signin} from '../controllers/authController.js'
import {hashPassword} from '../middlewares/hashPassword.js'
const router=express.Router()
router.post('/signup',hashPassword,signup)
router.post('/signin',signin)
export default router