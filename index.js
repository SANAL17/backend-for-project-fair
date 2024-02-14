// loads .env file content into process.env by default
require('dotenv').config()

// import express cors
const express = require('express')

const cors = require('cors')

const db = require('./DB/connection')

const router = require('./Routes/Router')

const appMiddleware= require('./Middlewares/AppMiddleware')

//Create a Backend Application using the express
const pfserver = express()

//Use cors
pfserver.use(cors())
pfserver.use(express.json())
pfserver.use(appMiddleware)
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))
//port connnection
const port = 4000 || process.env.port

//server listening
pfserver.listen(port,()=>{
    console.log("Listening on port " + port);
})

//localhost : 4000 ->res pfserver is started
pfserver.get('/',(req,res)=>{
    res.send(`<h1>Project Server Started<h1/>`)
})