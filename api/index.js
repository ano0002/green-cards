import express from 'express';
import apiRouter from './router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
