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

const getQuestionnairesPage = async (req: Request, res: Response) => {
  try {
    const response = await fhirClient.search({ resourceType: 'Questionnaire', searchParams: { _count: 10 } });
    return res.json({ response });
  } catch (err: any) {
    return res.status(400).json({
      error: `Failed to get paged questionnaires`,
    });
  }
};

const getPreviousQuestionnairesPage = async (req: Request, res: Response) => {
  const { response } = JSON.parse(req.body);

  try {
    const prevPageResponse = await fhirClient.prevPage(JSON.parse(response));
    return res.json({ response: prevPageResponse });
  } catch (err: any) {
    return res.status(400).json({
      error: `Failed to get paged questionnaires`,
    });
  }
};

const getNextQuestionnairesPage = async (req: Request, res: Response) => {
  const { response } = JSON.parse(req.body);
  console.log(req.params);
  console.log(response);

  try {
    const nextPageResponse = await fhirClient.nextPage(JSON.parse(response));
    return res.json({ response: nextPageResponse });
  } catch (err: any) {
    return res.status(400).json({
      error: `Failed to get paged questionnaires`,
    });
  }
};

export {
  getQuestionnaire,
  getQuestionnaires,
  getQuestionnairesPage,
  getPreviousQuestionnairesPage,
  getNextQuestionnairesPage,
};
