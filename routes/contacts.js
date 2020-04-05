const express = require('express');
const router = express.Router();
const axios = require('axios')

require('dotenv').config()


/**
 * router.post( /search ) searches the
 * Hubspot API for the value of the query
 * property of the body
 */

router.post('/search', (req, res) => {
  axios({
    method:'get',
    url:'https://api.hubapi.com/contacts/v1/search/query',
    params:{
      q:req.body.query,
      hapikey:process.env.HUBSPOT_API_KEY
    },
    headers: {'Content-Type': 'application/json'},
  })
  .then(data => {
    if (data.data.contacts.length){
      return res.status(200).json({exists:true})
    }
    return res.status(200).json({exists:false})

  })
  .catch(err => {
    res.status(500).send(`Error: ${err}`)
  })
})




/**
 * router.post( / ) sends a request to the
 * Hubspot API to add a new contact with
 * the values passed in the body
 */

router.post('/', (req, res) => {
  const newContact = req.body
  console.log(newContact);
    const contactBody = {
      properties:[]
    }

    for (const prop in newContact){
      contactBody.properties.push({property:prop, value:newContact[prop]})
    }

    const bodyData = JSON.stringify(contactBody)
       axios({
       method:'post',
       url:'https://api.hubapi.com/contacts/v1/contact/',
       params:{hapikey:process.env.HUBSPOT_API_KEY},
       headers: {'Content-Type': 'application/json'},
       data: bodyData

    })
    .then(data => {
      res.status(200).json(data.data)
    })
    .catch(err => {
      res.status(500).send(`Error: ${err}`)
    })
})

module.exports = router;
