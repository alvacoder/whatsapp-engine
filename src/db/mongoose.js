require('dotenv').config()
const mongoose = require('mongoose')
const dbUri = process.env.DB_URI

mongoose.connect(dbUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10
})
