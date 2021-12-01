import dotenv from 'dotenv';

import app from './app';

dotenv.config();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`FHIR Questionnaire app listening at http://localhost:${port}`);
});
