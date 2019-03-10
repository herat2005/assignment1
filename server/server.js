const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 8000;

app.use(cors());

app.get('/', (request, response) => {
  const page = request.param('page');

  try {
    setTimeout(() => { response.status(200).send({
      reviews: [
        {
          country: "US",
          reviewId: "R1SQ32067PGIK5",
          childAsin: "B01353CVBO",
          authorId: "",
          title: "Nice rattle sound",
          content: "Just as cute as it can be!!! Nice rattle sound!!!",
          stars: 5,
          verified: true,
          reviewCreated: 1517961600000,
          productImg: "61YqZpvCyaL",
          productTitle: "Bearington Baby Lil' Spout Plush Elephant Shaker Rattle, 5",
          watched: false,
          created: 1518038627000
        },
        {
          country: "US",
          reviewId: "R1SQ32067PGI1212",
          childAsin: "B01353CVBO",
          authorId: "",
          title: "Ugly comments",
          content: "Just sdja !!!",
          stars: 1,
          verified: true,
          reviewCreated: 1517961600000,
          productImg: "61YqZpvCyaL",
          productTitle: "akhd ashaksdask, 5",
          watched: false,
          created: 1518038627000
        },
        {
          country: "US",
          reviewId: "R3TGD8Y79S18UQ",
          childAsin: "B01M3S7P22",
          authorId: "",
          title: "Smaller than I thought.",
          content: "Smaller than I though it was going to be. Also- when I washed it, the fuzz got all over everything else in the washer/dryer.",
          stars: 3,
          verified: true,
          reviewCreated: 1517616000000,
          productImg: "51+gRXywflL",
          productTitle: "Hudson Baby Sherpa Blanket with Satin Binding, Pink",
          watched: false,
          created: 1517954722000
        },
        {
          country: "IND",
          reviewId: "R3TGD8Y79S112QL",
          childAsin: "B01M3S7P22",
          authorId: "",
          title: "Awesome",
          content: "Smaller than I though it was going to be. Also- when I washed it, the fuzz got all over everything else in the washer/dryer.",
          stars: 3,
          verified: true,
          reviewCreated: 1517616000000,
          productImg: "51+gRXywflL",
          productTitle: "Hudson Baby Sherpa Blanket with Satin Binding, Pink",
          watched: false,
          created: 1517954722000
        },
      ],
      hasMore: true,
    });}, 1000);
    // axios.get(`https://sellics-frontend-test.herokuapp.com/reviews/${page}`)
    //   .then(res => {
    //     response.status(200).send(res.data || {});
    //   })
    //   .catch(error => response.status(500).json())
  } catch (err) {
    response.status(500).json();
  }
});

app.listen(port, () => {
  console.log("server is running on port : " + port);
});