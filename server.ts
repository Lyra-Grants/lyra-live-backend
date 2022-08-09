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


// import getLyraPositions from "./src/lyra/getLyraPositions/getLyraPositions";
// getLyraPositions('0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238')

// import addUpdateUser from "./src/script/addUpdateUser";
// addUpdateUser(['0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155', '0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238'])


const server = async() => {
    await mongoose.connect(source)

    const db = mongoose.connection

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));   

    db.once('open', async () => {
        console.log("DB connected.");
    })

    app.use('/users', userRouter)
    app.use('/positions', positionRouter)

    const PORT = process.env.PORT || 4000
    app.listen(PORT, ()=>{
        console.log(`Successfully served on port: ${PORT}.`);
    })
    
    return mongoose
}

export default server;


