require('dotenv').config()
const mongoose = require('mongoose')
const dbUri = process.env.DB_URI



mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})