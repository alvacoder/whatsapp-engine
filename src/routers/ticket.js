/** 
 * @author : Adeniji Idris B. (@realprinceviper) 
 * @date : 2020-01-22 10:01:20 **/ 
 
require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    Router = new express.Router()

Router.use(bodyParser.json())
Router.use(bodyParser.urlencoded({ extended: true}))

module.exports = Router