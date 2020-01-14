const mongoose = require('mongoose'),
      bodyParser = require('body-parser')

      const Message = mongoose.model('Message', {
        userConvId: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        direction: {
            type: String,
            required: true,
            trim: true
        },
        createdDate: {
            type: Date,
            required: true
        }
    })

    module.exports = Message