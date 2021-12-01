import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import router from './routes';

dotenv.config();

const app = express();

app.get('/api/status', (_, res) => {
  res.json({ status: 'running' });
});

app.use(express.json());

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../app/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../app/dist/index.html'));
  });
}

export default app;
