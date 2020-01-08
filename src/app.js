const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const statusCallback = process.env.TWILIO_STATUS_CALLBACK
const replyURL = process.env.TWILIO_REPLY_URL
const accessKey = process.env.MESSAGEBIRD_ACCESS_KEY,
    channelId = process.env.MESSAGEBIRD_CHANNEL_ID,
    reportUrl = process.env.MESSAGEBIRD_REPORT_URL


const messagebird = require('messagebird')(accessKey, null, ["ENABLE_CONVERSATIONSAPI_WHATSAPP_SANDBOX"])
const port = process.env.PORT || 3800

app.use(express.json())

//get messagebird credit balance
let balance = messagebird.balance.read(function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });

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
    let startConv = async () => {
        let data = await messagebird.conversations.start(payload)
        return data;
    }

    startConv().then((response)=> {
        console.log(response)
        res.status(201)
    }).catch((err)=> {
        console.log(err)
        res.status(400)
    })
})

// Send message
app.post('/send', (req, res)=> {
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