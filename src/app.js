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
let conversations = messagebird.conversations
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




app.listen(port, ()=> {
    console.log('app running on port ', port)
})