// 'use strict';
//
// module.exports.getContacts = (event, context, callback) => {
//   const axios = require('axios')
//   require('dotenv').config()
//
//   const newContact = JSON.parse(event.body)
//
//   const contactBody = {
//     properties:[]
//   }
//
//   for (const prop in newContact){
//     contactBody.properties.push({property:prop, value:newContact[prop]})
//   }
//
//   const bodyData = JSON.stringify(contactBody)
//      axios({
//      method:'post',
//      url:'https://api.hubapi.com/contacts/v1/contact/',
//      params:{hapikey:process.env.HUBSPOT_API_KEY},
//      headers: {'Content-Type': 'application/json'},
//      data: bodyData
//
//   })
//   .then((res) => {
//     const response = {
//       statusCode: 200,
//       headers: {
//             "Access-Control-Allow-Origin": "*"
//         },
//       body: JSON.stringify({
//         response: res.data
//       }),
//     };
//     callback(null, response);
//   })
//   .catch((err) => {
//     console.error(err)
//     const response = {
//       statusCode: 400,
//       headers: {
//             "Access-Control-Allow-Origin": "*"
//         },
//       body: JSON.stringify({
//         response: err
//       }),
//     };
//     callback(null, response)
//   })
// };

const serverless = require('serverless-http');

const express = require('express')
var cors = require('cors')
const app = express()

const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

// const cuts = require('./routes/cuts')
// const barbers = require('./routes/barbers')
//
// app.use('/cuts', cuts);
// app.use('/barbers', barbers);

const contacts = require('./routes/contacts')

app.use('/contacts', contacts);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

module.exports.handler = serverless(app);
