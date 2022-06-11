const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

const mongoose = require('mongoose')

mongoose.connect(source, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once('open', () => {
  console.log("DB connected.");
})

require('dotenv').config()

const source = process.env.ATLAS_CONNECTION

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Successfully served on port: ${PORT}.`);
})