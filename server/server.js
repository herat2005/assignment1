const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 8000;

app.use(cors());

app.get('/', (request, response) => {
  const page = request.param('page');

  try {
    axios.get(`https://sellics-frontend-test.herokuapp.com/reviews/${page}`)
      .then(res => {
        response.status(200).send(res.data || {});
      })
      .catch(error => response.status(500).json())
  } catch (err) {
    response.status(500).json();
  }
});

app.listen(port, () => {
  console.log("server is running on port : " + port);
});