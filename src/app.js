const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const statusCallback = process.env.TWILIO_STATUS_CALLBACK
const replyURL = process.env.TWILIO_REPLY_URL

const twilio = require('twilio')
const client = new twilio(accountSid, authToken)
const port = process.env.PORT || 3000

app.use(express.json())
app.use

// Send message to whatsapp user
app.post('/', (req, res)=> {
    const from = 'whatsapp:+14155238886'
    const { body, recipient } = req.body
    //console.log(req.body);
    const payload = {
        body,
        from,
        statusCallback,
        to: `whatsapp:${recipient}`
    }

    const sendMsg = client.messages.create(payload)
    sendMsg.then((response)=> {
        res.send(response)
    }).done()
})

app.get('/', (req, res)=> {
    res.send('hello whatsapp')
})


app.listen(port, ()=> {
    console.log('app running on port ', port)
})