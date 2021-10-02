import express from 'express';
import path from 'path';

const app = express();
const port = 8080;

app.get('/api/status', (_, res) => {
  res.json({'status': 'running'});
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../../app/dist")));

  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../app/dist/index.html")
    );
  });
}

app.listen(port, () => {
  console.log(`FHIR Questionnaire app listening at http://localhost:${port}`);
});
