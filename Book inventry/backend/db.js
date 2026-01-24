const mongoose = require('mongoose')

const connetDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/book-inventory')
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database not connected", error);
    }
}

module.exports = connetDB