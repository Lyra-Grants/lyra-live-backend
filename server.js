const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

const mongoose = require('mongoose')
require('dotenv').config()

const source = process.env.ATLAS_CONNECTION

mongoose.connect(source)

const connection = mongoose.connection
connection.once('open', () => {
  console.log("DB connected.");
})

const PORT = process.env.PORT || 6000
app.listen(PORT, ()=>{
    console.log(`Successfully served on port: ${PORT}.`);
})