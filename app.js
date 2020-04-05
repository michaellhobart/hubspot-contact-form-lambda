const serverless = require('serverless-http');

const express = require('express')
var cors = require('cors')
const app = express()

const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

const contacts = require('./routes/contacts')

app.use('/contacts', contacts);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

module.exports.handler = serverless(app);
