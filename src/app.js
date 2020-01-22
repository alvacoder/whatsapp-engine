/** 
 * @author : Adeniji Idris B. (@realprinceviper) 
 * @date : 2020-01-22 09:41:20 **/ 
 
require('dotenv').config()

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser')

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const statusCallback = process.env.TWILIO_STATUS_CALLBACK
const replyURL = process.env.TWILIO_REPLY_URL

const twilio = require('twilio')
const client = new twilio(accountSid, authToken)

const routerConfig = require('./routers/config')
app.use('/', routerConfig)

// Send message
app.post('/send', (req, res) => {
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

//Chat Logs by Date && Paginate
app.get('/logs', async(req, res) => {
    try {
        let msgHistory = await client.messages.list({limit: 5})
        res.send(msgHistory)
    } catch (error) {
        res.status(400).send
    }
})

/* app.get('/logs', (req, res) => {
    let msgHistory = client.messages.list({limit: 5})
    msgHistory.then((data)=> {
        res.send(msgHistory)
    })
}) */

//Chat logs by recipient
app.get('/chat/:recipient', async(req, res)=> {
    const to = req.params.recipient

    try {
        let msgHistory = await client.messages.list({
            to,
            limit: 5
        })
        res.send(msgHistory)
    } catch (error) {
        res.status(400).send();
    }
})

const port = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log('app running on port ', port)
})