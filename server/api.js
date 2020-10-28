const express = require('express');
const apiRouter = express.Router();

//minions router
const minionsRouter = require('./minions.js');
apiRouter.use('/minions', minionsRouter);

//ideas router
const ideasRouter = require('./ideas.js');
apiRouter.use('/ideas', ideasRouter);

//meetings router
const meetingsRouter = require('./meetings.js');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;