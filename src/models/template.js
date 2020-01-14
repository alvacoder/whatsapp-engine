const mongoose = require('mongoose'),
      bodyParser = require('body-parser')

      const Template = mongoose.model('Template', {
        templateName: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String
        }
    })

    module.exports = Template;