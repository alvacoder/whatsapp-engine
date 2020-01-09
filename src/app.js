const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()
const accessKey = process.env.MESSAGEBIRD_ACCESS_KEY,
    channelId = process.env.MESSAGEBIRD_CHANNEL_ID,
    reportUrl = process.env.MESSAGEBIRD_REPORT_URL,
    msgHook = process.env.MESSAGEBIRD_MSG_HOOK,
    convHook = process.env.MESSAGEBIRD_CONV_HOOK



const messagebird = require('messagebird')(accessKey, null, ["ENABLE_CONVERSATIONSAPI_WHATSAPP_SANDBOX"])
const conversations = messagebird.conversations,
      webhooks = messagebird.webhooks

const port = process.env.PORT || 3800

app.use(express.json())

//Get Messagebird Credit Balance
app.post('/balance', async (req, res) => {
    let balance = messagebird.balance.read(function (err, data) {
        if (err) {
        return console.log(err);
        }
        console.log(data);
        res.send(data)
    });
})

//create messages webhooks
const params = {
    events: [
        message.created,
        message.updated
    ],
    channelId,
    url: msgHook
}
webhooks.create(params, function (err, response) {
    if(err) {
        return console.log(err)
    }
    console.log('msg webhook created')
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
        let conversationsId = response.id
        res.send(response)
    })
})

// Send message
app.post('/reply', (req, res)=> {
    var params = {
    'to': '+2347085183282',
    channelId,
    'type': 'text',
    'content': { 'text': 'Hello!' }
    };

    messagebird.conversations.start(params, function (err, response) {
        if (err) {
        return console.log(err);
        }
        console.log(response);
      });
})

//Message Logs by Date


app.listen(port, ()=> {
    console.log('app running on port ', port)
})