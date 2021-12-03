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
        error: 'Questionnaire with given ID was not found',
      });
    }
    return res.status(400).json({
      error: `Failed to get questionnaire with ID ${id}`,
    });
  }
};

const postQuestionnaire = async (req: Request, res: Response) => {
  const { id } = req.params;
  let questionnaireData;

  // Check if the questionnaire can be found
  try {
    questionnaireData = await fhirClient.read({ resourceType: 'Questionnaire', id });
  } catch (err: any) {
    if (err.response.status === 404) {
      return res.status(404).json({
        error: 'ID given was not found',
      });
    }
    return res.status(400).json({
      error: `Failed to get questionnaire with ID ${id}`,
    });
  }

  // Pass the questionnaire data through validation, check for errors
  const validationErrors = validateQuestionnaire(questionnaireData.item, req.body);
  if (Object.keys(validationErrors).length > 0) {
    console.log(`Validation Errors for questionnaire with id=${id}: ${validationErrors}`);
    return res.status(400).json(validationErrors);
  }

  const questionnaireResponse = constructResponse(questionnaireData, req.body);
  // Pass the questionnaire response through validation, on the FHIR API side
  let validateResponse = { data: {} };
  try {
    validateResponse = await axios.post(
      `${process.env.FHIR_API}/QuestionnaireResponse/$validate`,
      questionnaireResponse,
    );
  } catch (err: any) {
    return res.status(400).json(validateResponse.data);
  }

  console.log(validateResponse);
  // Once validated twice, submit the response
  let submitResponse = { data: {} };
  try {
    submitResponse = await axios.post(`${process.env.FHIR_API}/QuestionnaireResponse`, questionnaireResponse);
  } catch (err: any) {
    return res.status(400).json(submitResponse.data);
  }

  return res.status(200).json(submitResponse.data);
};

export { getQuestionnaire, getQuestionnaires, postQuestionnaire };
