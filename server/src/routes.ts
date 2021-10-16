import express from 'express';
import {
  getNextQuestionnairesPage,
  getPreviousQuestionnairesPage,
  getQuestionnaire,
  getQuestionnaires,
  getQuestionnairesPage,
} from './controllers/Questionnaire';

const router = express.Router();

router.get('/questionnaire/:id', getQuestionnaire);
router.get('/questionnaire', getQuestionnaires);
router.get('/questionnairenext', getNextQuestionnairesPage);
router.get('/questionnairepage', getQuestionnairesPage);
router.get('/questionnaireprev', getPreviousQuestionnairesPage);

export default router;
