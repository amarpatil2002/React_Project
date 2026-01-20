const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on("connection", (socket) => {
    socket.on('user-message', (message) => {
        console.log("user1-message : ", message);
        io.emit("user2-message", message)
    })
})

app.use(express.static(path.resolve('./public')))

app.get('/', (req, res) => {
    return res.sendFile('/public/index.js')
})

server.listen(4000, () => {
    console.log(`Server is listing at ${4000}`);
})

