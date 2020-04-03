'use strict';

module.exports.hello = (event, context, callback) => {
  const axios = require('axios')
  axios.get('https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=0583c826-e8de-4f2f-b677-2f11a5a0399c')
  .then((res) => {
    const response = {
      statusCode: 200,
      headers: {
            "Access-Control-Allow-Origin": "*"
        },
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        // input: event,
        response: res.data
      }),
    };

    callback(null, response);
  })




};
