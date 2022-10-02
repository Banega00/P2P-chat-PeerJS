const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static('public'))

io.on('connection', socket => {
  socket.on('new-peer', (peerId) => {

    console.log(`New peer connected: ${peerId}`)

    socket.broadcast.emit('new-peer', peerId)

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', peerId)
    })
  })
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
