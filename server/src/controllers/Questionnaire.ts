import { Request, Response } from 'express';
import axios from 'axios';
import fhirClient from '../lib/fhir';
import { validateQuestionnaire, constructResponse } from '../lib/Questionnaire';

const getQuestionnaires = async (_: Request, res: Response) => {
  try {
    const response = await fhirClient.search({ resourceType: 'Questionnaire' });
    return res.json(response);
  } catch (err) {
    return res.status(400).json({
      message: `Failed to get questionnaires`,
    });
  }
};

const getQuestionnaire = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await fhirClient.read({ resourceType: 'Questionnaire', id });
    return res.json(response);
  } catch (err: any) {
    if (err.response.status === 404) {
      return res.status(404).json({
        error: 'ID was not found',
      });
    }
    return res.status(400).json({
      error: `Failed to get questionnaire with id ${id}`,
    });
  }
};

const postQuestionnaire = async (req: Request, res: Response) => {
  const { id } = req.params;
  let questionnaireData;
  try {
    questionnaireData = await fhirClient.read({ resourceType: 'Questionnaire', id });
  } catch (err: any) {
    if (err.response.status === 404) {
      return res.status(404).json({
        error: 'ID was not found',
      });
    }
    return res.status(400).json({
      error: `Failed to get questionnaire with id ${id}`,
    });
  }

  const validationErrors = validateQuestionnaire(questionnaireData.item, req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json(validationErrors);
  }

  const questionnaireResponse = constructResponse(questionnaireData, req.body);

  console.log(questionnaireResponse);

  return res.status(200).json(questionnaireResponse);
};

type pagingReqQuery = { next: string; previous: string };
const getQuestionnairesPage = async (req: Request<pagingReqQuery>, res: Response) => {
  const { next, previous } = req.query;
  try {
    if ((next && typeof next !== 'string') || (previous && typeof previous !== 'string')) {
      return res.status(400).json({
        error: `Failed to get paged questionnaires because next/previous is not a string`,
      });
    }

    if (next) {
      const response = await axios.get(next);
      return res.json({ response: response.data });
    }

    if (previous) {
      const response = await axios.get(previous);
      return res.json({ response: response.data });
    }

    const response = await fhirClient.search({ resourceType: 'Questionnaire', searchParams: { _count: 10 } });
    return res.json({ response });
  } catch (err: any) {
    return res.status(400).json({
      error: `Failed to get paged questionnaires`,
    });
  }
};

export { getQuestionnaire, getQuestionnaires, getQuestionnairesPage, postQuestionnaire };
