// Wraps express API for serverless use
const serverless = require('serverless-http');

const express = require('express')
var cors = require('cors')
const app = express()

const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

// Routes
const contacts = require('./routes/contacts')
const companies = require('./routes/companies')

app.use('/contacts', contacts);
app.use('/companies', companies);

app.get('/', (req, res) => {
  res.send("HELLO HUBSPOT!")
})

module.exports.handler = serverless(app);
