import express from 'express';
import {
  getQuestionnaire,
  getQuestionnaires,
  getQuestionnairesPage,
  postQuestionnaire,
} from './controllers/Questionnaire';

const router = express.Router();

router.get('/questionnaire/:id', getQuestionnaire);
router.post('/questionnaire/:id', postQuestionnaire);
router.get('/questionnaire', getQuestionnaires);
router.get('/questionnairepage', getQuestionnairesPage);

export default router;
