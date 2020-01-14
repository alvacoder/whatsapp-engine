const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const db = require('./db')

dotenv.config()
const accessKey = process.env.MESSAGEBIRD_ACCESS_KEY,
    channelId = process.env.MESSAGEBIRD_CHANNEL_ID,
    reportUrl = process.env.MESSAGEBIRD_REPORT_URL,
    msgHookUrl = process.env.MESSAGEBIRD_MSG_HOOK,
    convHookUrl = process.env.MESSAGEBIRD_CONV_HOOK



const messagebird = require('messagebird')(accessKey, null, ["ENABLE_CONVERSATIONSAPI_WHATSAPP_SANDBOX"])
const conversations = messagebird.conversations,
      webhooks = conversations.webhooks

const port = process.env.PORT || 3800

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.get('/', (req, res) => {
    res.send('Welcome to ATB Whatsapp Engine 1.0')
})

//Get Messagebird Credit Balance
app.get('/balance', async (req, res) => {
    let balance = messagebird.balance.read(function (err, data) {
        if (err) {
        return console.log(err);
        }
        console.log(data);
        res.send(data)
    });
})

//create messages webhooks
app.post('/webhooks/create', (req, res) => {
    const msgHookParams = {
        events: [
            'message.created',
            'message.updated'
        ],
        channelId,
        url: msgHookUrl
    }
    webhooks.create(msgHookParams, function (err, response) {
        if(err) {
            return console.log(err)
        }
        console.log('msg webhook created')
        return res.send(response)
    })
})

//create conversations webhook - won't work in sandbox environment
/* 
const convHookParams = {
    events: [
        'conversation.created',
        'conversation.updated'
    ],
    channelId,
    url: convHookUrl
}
webhooks.create(convHookParams, function (err, response) {
    if(err) {
        return console.log(err)
    }
    console.log('conversation webhook created')
})
 */

 //list all webhooks
 app.get('/webhooks', (req, res) => {
    let webhooksList = webhooks.list(function(err, response) {
        if (err) {
            return console.log(err);
            }
            res.send(response)
    })
})

// start a conversation
app.post('/start', (req, res)=> {
    let payload = {
        'to': '2347085183282',
        channelId,
        'type': 'hsm',
        'content': {
                'hsm': {
                'namespace': 'eb4d5655_295e_4ada_8614_702a0efe2c85',
                'templateName': 'verification',
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

// Reply Conversation (conversation id saved in database)
app.post('/reply', (req, res)=> {
    let conversationId = req.body.convId,
        msg = req.body.msg
    let payload = {
    'type': 'text',
    'content': { 'text': msg },
    'source': {'ATB' : 'Whatsapp Engine'}
    };

    conversations.reply(conversationId, payload, function (err, response) {
        if (err) {
        return console.log(err);
        }
        res.send(response);
      });
})

//Receive Message from webhook
app.post('/message', (req, res) => {
    let payload = req
})

//Message Logs by Date


app.listen(port, ()=> {
    console.log('app running on port ', port)
})