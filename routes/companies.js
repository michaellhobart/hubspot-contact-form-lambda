const express = require('express');
const router = express.Router();
const axios = require('axios')

require('dotenv').config()

const getNames = (list) => {
  var namesList = [];
  list.map(contact => {
    namesList.push(contact.properties.name.value)
  })
  return namesList
}


/**
 * router.get( / ) returns a list of all companies names
 * from the Hubspot API
 */

router.get('/', (req, res) => {
  axios({
    method:'get',
    url:'https://api.hubapi.com/companies/v2/companies/paged',
    params:{
      hapikey:process.env.HUBSPOT_API_KEY,
      properties:"name"
    },
    headers: {'Content-Type': 'application/json'},
  })
  .then(data => {
    res.status(200).json(getNames(data.data.companies))
  })
  .catch(err => {
    res.status(500).send(`Error: ${err}`)
  })
})

/**
 * router.post( / ) adds a new company to the
 * Hubspot API
 */



router.post('/', (req, res) => {
  const newContact = req.body
    const contactBody = {
      properties:[]
    }

    for (const prop in newContact){
      contactBody.properties.push({name:prop, value:newContact[prop]})
    }

  const bodyData = JSON.stringify(contactBody)
  axios({
    method:'post',
    url:'https://api.hubapi.com/companies/v2/companies',
    params:{hapikey:process.env.HUBSPOT_API_KEY},
    headers: {'Content-Type': 'application/json'},
    data: bodyData
  })
  .then(data => {
    res.status(201).json(data.data)
  })
  .catch(err => {
    res.status(500).send(`Error: ${err}`)
  })
})



module.exports = router;
