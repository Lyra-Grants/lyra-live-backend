import express from 'express'
import { Application } from 'express'
import { json } from 'body-parser'
import * as dotenv from 'dotenv'
dotenv.config()

import positionRouter from './src/controllers/positionController'
import userRouter from './src/controllers/userController'

const app: Application = express()

// allow requests from outside resources like postman, or your frontend if you choose to build that out
const cors = require('cors')
app.use(cors())

// app will serve and receive data in a JSON format
app.use(json())

// the messenger between our app and our database
const mongoose = require('mongoose')

// allow us to hide our connection secret in the process.env object
const source = process.env.ATLAS_CONNECTION

// import getPositions from "./lyra/getPositions/getPositions";
// const account = '0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155'
// const userPositions = getPositions([account])

mongoose.connect(source)

const connection = mongoose.connection
connection.once('open', async () => {
    console.log("DB connected.");
    // console.log("burtrico userPositions", await userPositions)
})

app.use('/users', userRouter)
app.use('/positions', positionRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`Successfully served on port: ${PORT}.`);
})
