const express = require('express');

const minionsRouter = express.Router();

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

//get method to get an array of all minions
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

//post method to create a new minion and save it to the database
minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

//Get method to get single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

//put method to update a single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
  let update = updateInstanceInDatabase('minions', req.body);
  res.send(update);
});

//delete method to delete single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
  let deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if(deleted){
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

//work routes
//Get method for work to get array of all work for specified minion
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === req.params.minionId;
    });
    if (work){
      res.send(work);
    } else {
      res.status(404).send();
    }
});

//post method to create a new work object and save to DB
minionsRouter.post('/:minionId/work', (req, res, next) => {
  const newWork = req.body;
  newWork.minionId = req.params.minionId;
  const createWork = addToDatabase('work', newWork);
  res.status(201).send(createWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

//put method to update a single work by id
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if(req.params.minionId !== req.body.minionId){
    res.status(400).send();
  } else {
    let update = updateInstanceInDatabase('work', req.body);
    res.send(update);
  }
});

//delete method to delete a single work by id
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('work', req.params.workId);
  if(deleted){
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = minionsRouter;