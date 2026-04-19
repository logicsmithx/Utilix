import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/tasks.js'
import noteRoutes from './routes/notes.js'
import passwordRoutes from './routes/passwords.js'
import mongoose from 'mongoose'
mongoose.connect('mongodb://127.0.0.1:27017/utilix')
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err))
const app=express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/tasks',taskRoutes)
app.use('/api/notes',noteRoutes)
app.use('/api/passwords',passwordRoutes)
app.listen(5000,()=>console.log('server running on 5000'))