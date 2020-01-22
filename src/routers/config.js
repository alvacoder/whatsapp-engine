/** 
 * @author : Adeniji Idris B. (@realprinceviper) 
 * @date : 2020-01-22 09:58:22 **/ 
 
const express = require('express'),
      Router = express.Router(),
      ticketRoute = require('./ticket')

Router.use('/ticket', ticketRoute)

Router.get('/', async(req, res)=> {
    res.send('Welcome to ATB Whatsapp engine')
})

module.exports = Router