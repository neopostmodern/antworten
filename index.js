const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');

const questionnaire = require('./questionnaire');

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

const port = 4000;

const mongoClient = new MongoClient("mongodb://localhost:27017");
mongoClient.connect(function(error, client) {
  if (error) {
    console.error(error);
    return
  }

  const database = client.db("antworten");

  app.post("/antwort/:surveyName", (request, response) => {
    const surveyName = sanitize(request.params.surveyName);
    const data = sanitize(request.body);
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
