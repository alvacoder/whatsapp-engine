const express = require('express'),
     bodyParser = require('body-parser'),
     Message = require('../models/message'),
     User = require('../models/user'),
     router = new express.Router()

require('dotenv').config()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended : true }))

const accessKey = process.env.MESSAGEBIRD_ACCESS_KEY,
    channelId = process.env.MESSAGEBIRD_CHANNEL_ID,
    reportUrl = process.env.MESSAGEBIRD_REPORT_URL,
    msgHookUrl = process.env.MESSAGEBIRD_MSG_HOOK,
    convHookUrl = process.env.MESSAGEBIRD_CONV_HOOK

const messagebird = require('messagebird')(accessKey, null, ["ENABLE_CONVERSATIONSAPI_WHATSAPP_SANDBOX"])
const conversations = messagebird.conversations,
      webhooks = conversations.webhooks

//Get Messagebird Credit Balance
router.get('/balance', async (req, res) => {
    let balance = messagebird.balance.read(function (err, data) {
        if (err) {
        return console.log(err);
        }
        console.log(data);
        res.send(data)
    });
})

// start a conversation
router.post('/start', (req, res)=> {
    let to = req.body.recipient,
        templateName = req.body.templateName
    let payload = {
        to,
        channelId,
        type: 'hsm',
        content: {
                'hsm': {
                'namespace': 'eb4d5655_295e_4ada_8614_702a0efe2c85',
                templateName,
                'language': {
                    'policy': 'deterministic',
                    'code': 'en'
                },
                'params': [
                    {"default": "MessageBird"},
                    {"default": "123456"},
                ]
                }
            }
        }

    conversations.start(payload, (err, response) => {
        if(err) {
            return res.send(err)
        }
        console.log(response)
        let conversationId = response.id
        res.send(response)
    })
})

//save conversation ID and user phone when sandbox is joined
router.post('/message', async (req, res)=> {
    const phone = req.body.contact.msisdn
     convId = req.body.conversation.id,
     content = req.body.message.content.text

     const user = new User({
         phone,
         convId
     })

     try {
         await user.save()
     } catch (error) {
         res.status(400).send()
     }
})

module.exports = router