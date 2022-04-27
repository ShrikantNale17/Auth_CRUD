const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")

const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')
const loginRouter = require('./controller/login')
const auth = require('./controller/auth')

dotenv.config()
const url = process.env.DB_URL

const port = process.env.PORT || 8080
// const url = 'mongodb://localhost/secure'

const app = express()

mongoose.connect(url, () => {
    console.log("connected successfully");
})
app.use(cookieParser())

app.use(express.json())

app.use('/auth', loginRouter)

// app.use('/', auth)

app.all('/*', (req, res, next) => {
    if (req.method == 'OPTIONS') {
        res.status(200).end()
    } else {
        next()
    }
})

app.use('/products', auth, productsRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log("Server is running on port 8080");
})