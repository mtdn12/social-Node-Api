const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')

const config =  require('./config/index')

// Import routes
const postRoutes = require('./routes/post')
console.log(config)

mongoose.connect(config.MONGO_URI).then(() => {
    console.log("DB Connected")
})

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

// Middleware
app.use(morgan('dev'))

app.use("/",postRoutes)

const PORT = config.PORT || 8080

app.listen(PORT, () => {
    console.log(`App run on port ${PORT}`)
})