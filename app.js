const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')

const config =  require('./config/index')
// Import routes
const postRoutes = require('./routes/post')

mongoose.connect(config.MONGO_URI, {useNewUrlParser: true}).then(() => {
    console.log("DB Connected")
})
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

// Middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator())

app.use("/",postRoutes)

const PORT = config.PORT || 8080

app.listen(PORT, () => {
    console.log(`App run on port ${PORT}`)
})