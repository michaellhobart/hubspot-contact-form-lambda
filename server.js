require('dotenv').config()
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

const port = process.env.PORT || 4000

const contacts = require('./routes/contacts')
const companies = require('./routes/companies')

app.use('/contacts', contacts);
app.use('/companies', companies);


app.get('/', (req, res) => {
  res.send("HELLO HUBSPOT!")
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
