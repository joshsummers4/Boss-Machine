const express = require('express');
const { 
  addToDatabase,
  createMeeting,
  getAllFromDatabase,
  deleteAllFromDatabase 
} = require('./db');

const meetingsRouter = express.Router();

//get method to get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

//post method to create a new minion and save it to the database
meetingsRouter.post('/', (req, res, next) => {
  let newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

//delete method to delete single minion by id
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingsRouter;