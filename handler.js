'use strict';

module.exports.getContacts = (event, context, callback) => {
  const axios = require('axios')
  require('dotenv').config()
  axios.get('https://api.hubapi.com/contacts/v1/lists/all/contacts/all', {
    params: {
      hapikey:process.env.HUBSPOT_API_KEY
    }
  })
  // axios.post('https://api.hubapi.com/contacts/v1/contact')
  .then((res) => {
    const response = {
      statusCode: 200,
      headers: {
            "Access-Control-Allow-Origin": "*"
        },
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
        response: res.data
      }),
    };
    callback(null, response);
  })
};
