const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const PUBLIC_DIR = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(PUBLIC_DIR))

io.on('connection', socket => {
  console.log('New Web socket connection')
  socket.emit('message', 'Welcome!')
  socket.broadcast.emit('message', 'A New user has joined the chat')
  socket.on('sendMessage', message => {
    io.emit('message', message)
  })
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!')
  })
  socket.on('sendLocation', location => {
    io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`)
  })
})

server.listen(port, () => console.log(`Server started in Port: ${port}`))
