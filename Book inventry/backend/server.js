const express = require("express")
const cors = require('cors')
const connectDB = require('./db')
const bookRote = require('./routes')

const app = express()
const port = 5000

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api', bookRote)

app.listen(port, () => {
    console.log("server listening at ", port);
})