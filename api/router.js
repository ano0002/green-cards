import express from 'express';

import usersRouter from './users.js';
import questionsRouter from './questions.js';

const apiRouter = express.Router();

// Middleware to parse JSON bodies
apiRouter.use(express.json());

apiRouter.get('/', (req, res) => {
    res.send(`API endpoint: ${req.path}`);
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/questions', questionsRouter);

apiRouter.use((req, res) => {
    res.status(404).send('API endpoint not found');
});

export default apiRouter;