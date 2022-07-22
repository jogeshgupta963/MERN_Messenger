import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'

import { connect } from './database/db.js'
import cors from 'cors'
import 'dotenv/config'
import { Server } from 'socket.io'
import { router as user } from './routes/user.js'
import { router as chat } from './routes/chat.js'
import { router as message } from './routes/message.js'
import http from 'http'

//express app
const app = express()

//socket io
const server = http.createServer(app)

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join_chat', (room) => {
    socket.join(room)
  })

  socket.on('new_message', (newMessage) => {
    let chat = newMessage.chat
    if (!chat.users) return console.log('no users')

    chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) {
        return
      }
      // socket.in(user._id).emit('message_recieved', newMessage)
      socket.to(newMessage.chat._id).emit('message_recieved', newMessage)
    })
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
  })
})

//use
app.use(express.json())
app.use(cors())
app.use(cookieParser())
// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//routes

app.use('/user', user)
app.use('/chat', chat)
app.use('/message', message)

//database
;(async function () {
  try {
    await connect(process.env.MONGO_URI)
    console.log('DB connected')
    var port = process.env.PORT || 3001
    server.listen(port, () => console.log(`Server started on port ${port}`))
  } catch (err) {
    console.log(err.message)
  }
})()
