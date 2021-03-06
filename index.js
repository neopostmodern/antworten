const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');

const questionnaire = require('./questionnaire');

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

const port = process.env.PORT;

const mongoClient = new MongoClient(process.env.MONGO_URL);
mongoClient.connect(function(error, client) {
  if (error) {
    console.error(error);
    return
  }

  const database = client.db(process.env.DATABASE);

  app.post("/antwort/:surveyName", (request, response) => {
    const surveyName = sanitize(request.params.surveyName);
    const data = sanitize(request.body);
    data.receivedAt = new Date();
    database.collection(surveyName).insert(data, (error, result) => {
      if (error) {
        console.error(error);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    })
  })

  app.get("/fragen/:surveyName", (request, response) => {
    const surveyName = sanitize(request.params.surveyName);

    if (surveyName !== 'wohnen-hgb') {
      response.sendStatus(404);
      return;
    }

    response.json(questionnaire);
  })

  app.listen(port);
  console.log(`Listening on port ${port}...`);
});
