import express from 'express';
import { getQuestionnaire, getQuestionnaires, postQuestionnaire } from './controllers/Questionnaire';

const router = express.Router();

router.get('/questionnaire/:id', getQuestionnaire);
router.post('/questionnaire/:id', postQuestionnaire);
router.get('/questionnaire', getQuestionnaires);

export default router;
