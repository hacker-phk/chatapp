import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/user.routes.js'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.Routes.js'
import { app ,server,io} from './socket/socket.js'

import connectToDB from './db/connectToDB.js'
env.config()
const port=process.env.PORT || 5000;





app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
})

server.listen(port, () => {
    connectToDB();
    console.log(`Example app listening on port ${port}`)
})