import express from 'express';
import { getQuestionnaire, getQuestionnaires, getQuestionnairesPage } from './controllers/Questionnaire';

const router = express.Router();

router.get('/questionnaire/:id', getQuestionnaire);
router.get('/questionnaire', getQuestionnaires);
router.get('/questionnairepage', getQuestionnairesPage);

export default router;
