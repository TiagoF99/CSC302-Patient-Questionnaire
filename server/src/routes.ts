import express from 'express';
import { getQuestionnaire, getQuestionnaires } from './controllers/Questionnaire';

const router = express.Router();

router.get('/questionnaire/:id', getQuestionnaire);
router.get('/questionnaire', getQuestionnaires);

export default router;
