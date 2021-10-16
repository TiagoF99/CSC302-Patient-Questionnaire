import { Request, Response } from 'express';
import fhirClient from '../lib/fhir';

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

export { getQuestionnaire, getQuestionnaires };
