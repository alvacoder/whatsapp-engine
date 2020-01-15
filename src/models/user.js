const mongoose = require('mongoose'),
      bodyParser = require('body-parser')


      const User = mongoose.model('Task', {
        phone: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        convId: {
            type: String,
            required: true,
            trim: true
        }
    })

    module.exports = User