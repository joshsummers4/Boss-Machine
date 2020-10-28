const express = require('express');

const ideasRouter = express.Router();

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

//get method to get an array of all ideas
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

//post method to create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

//Get method to get single idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

//put method to update a single idea by id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  let update = updateInstanceInDatabase('ideas', req.body);
  res.send(update);
});

//delete method to delete single idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if(deleted){
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});


module.exports = ideasRouter;