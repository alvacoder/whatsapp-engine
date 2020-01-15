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

module.exports = router