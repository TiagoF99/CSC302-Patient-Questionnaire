import request from 'supertest';
import axios from 'axios';
import app from '../../app';
import fhirClient from '../../lib/fhir';
import * as Questionnaire from '../../lib/Questionnaire';

describe('getQuestionnaires endpoint', () => {
  const endpoint = '/api/questionnaire';
  test('Status 200', async () => {
    const mockedFhirSearch = jest
      .spyOn(fhirClient, 'search')
      .mockReturnValueOnce(Promise.resolve({ resourceType: 'bundle' }));

    await request(app)
      .get(endpoint)
      .then(async (response) => {
        expect(mockedFhirSearch).toBeCalled();
        expect(response.statusCode).toBe(200);
      });
  });

  test('Status 400', async () => {
    const mockedFhirSearch = jest.spyOn(fhirClient, 'search').mockRejectedValueOnce(new Error('error'));

    await request(app)
      .get(endpoint)
      .then(async (response) => {
        expect(mockedFhirSearch).toBeCalled();
        expect(response.statusCode).toBe(400);
      });
  });
});

describe('getQuestionnaire endpoint', () => {
  const endpoint = '/api/questionnaire/123';

  test('Status 200', async () => {
    const mockedFhirRead = jest
      .spyOn(fhirClient, 'read')
      .mockReturnValueOnce(Promise.resolve({ resourceType: 'Questionnaire' }));

    await request(app)
      .get(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(response.statusCode).toBe(200);
      });
  });

  test('Status 400', async () => {
    const error = new Error('error');
    // @ts-expect-error
    error.response = { status: 400 };
    const mockedFhirRead = jest.spyOn(fhirClient, 'read').mockRejectedValue(error);

    await request(app)
      .get(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(response.statusCode).toBe(400);
      });
  });

  test('Status 404', async () => {
    const error = new Error('error');
    // @ts-expect-error
    error.response = { status: 404 };
    const mockedFhirRead = jest.spyOn(fhirClient, 'read').mockRejectedValue(error);

    await request(app)
      .get(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(response.statusCode).toBe(404);
      });
  });
});

describe('postQuestionnaire endpoint', () => {
  const endpoint = '/api/questionnaire/123';

  test('Status 200', async () => {
    const mockedFhirRead = jest
      .spyOn(fhirClient, 'read')
      .mockReturnValueOnce(Promise.resolve({ resourceType: 'Questionnaire' }));

    const mockedValidateQuestionnaire = jest.spyOn(Questionnaire, 'validateQuestionnaire').mockReturnValueOnce({});
    const mockedConstructResponse = jest
      .spyOn(Questionnaire, 'constructResponse')
      .mockReturnValueOnce({ resourceType: 'Questionnaire', questionnaire: {}, item: {}, status: '200' });
    const mockedAxiosPost = jest
      .spyOn(axios, 'post')
      .mockReturnValue(Promise.resolve({ resourceType: 'Questionnaire' }));

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(mockedValidateQuestionnaire).toBeCalled();
        expect(mockedConstructResponse).toBeCalled();
        expect(mockedAxiosPost).toBeCalled();
        expect(response.statusCode).toBe(200);
      });
  });

  test('Status 400 questionnaire not found', async () => {
    const error = new Error('error');
    // @ts-expect-error
    error.response = { status: 400 };
    const mockedFhirRead = jest.spyOn(fhirClient, 'read').mockRejectedValue(error);

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(response.statusCode).toBe(400);
      });
  });

  test('Status 404 questionnaire not found', async () => {
    const error = new Error('error');
    // @ts-expect-error
    error.response = { status: 404 };
    const mockedFhirRead = jest.spyOn(fhirClient, 'read').mockRejectedValue(error);

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(response.statusCode).toBe(404);
      });
  });

  test('Status 400 invalid questionnaire', async () => {
    const mockedFhirRead = jest
      .spyOn(fhirClient, 'read')
      .mockReturnValueOnce(Promise.resolve({ resourceType: 'Questionnaire' }));

    const mockedValidateQuestionnaire = jest
      .spyOn(Questionnaire, 'validateQuestionnaire')
      .mockReturnValueOnce({ error: 'error' });

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(mockedValidateQuestionnaire).toBeCalled();
        expect(response.statusCode).toBe(400);
      });
  });

  test('Status 400 invalid questionnaire', async () => {
    const mockedFhirRead = jest
      .spyOn(fhirClient, 'read')
      .mockReturnValueOnce(Promise.resolve({ resourceType: 'Questionnaire' }));

    const mockedValidateQuestionnaire = jest
      .spyOn(Questionnaire, 'validateQuestionnaire')
      .mockReturnValueOnce({ error: 'error' });

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(mockedValidateQuestionnaire).toBeCalled();
        expect(response.statusCode).toBe(400);
      });
  });

  test('Status 400 bad validate', async () => {
    const mockedFhirRead = jest
      .spyOn(fhirClient, 'read')
      .mockReturnValueOnce(Promise.resolve({ resourceType: 'Questionnaire' }));

    const mockedValidateQuestionnaire = jest.spyOn(Questionnaire, 'validateQuestionnaire').mockReturnValueOnce({});
    const mockedConstructResponse = jest
      .spyOn(Questionnaire, 'constructResponse')
      .mockReturnValueOnce({ resourceType: 'Questionnaire', questionnaire: {}, item: {}, status: '200' });
    const mockedAxiosPost = jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('error'));

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(mockedValidateQuestionnaire).toBeCalled();
        expect(mockedConstructResponse).toBeCalled();
        expect(mockedAxiosPost).toBeCalled();
        expect(response.statusCode).toBe(400);
      });
  });

  test('Status 400 bad submit', async () => {
    const mockedFhirRead = jest
      .spyOn(fhirClient, 'read')
      .mockReturnValueOnce(Promise.resolve({ resourceType: 'Questionnaire' }));

    const mockedValidateQuestionnaire = jest.spyOn(Questionnaire, 'validateQuestionnaire').mockReturnValueOnce({});
    const mockedConstructResponse = jest
      .spyOn(Questionnaire, 'constructResponse')
      .mockReturnValueOnce({ resourceType: 'Questionnaire', questionnaire: {}, item: {}, status: '200' });
    const mockedAxiosPostValidate = jest
      .spyOn(axios, 'post')
      .mockReturnValueOnce(Promise.resolve({ resourceType: 'Questionnaire' }));
    const mockedAxiosPostSubmit = jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('error'));

    await request(app)
      .post(endpoint)
      .then(async (response) => {
        expect(mockedFhirRead).toBeCalled();
        expect(mockedValidateQuestionnaire).toBeCalled();
        expect(mockedConstructResponse).toBeCalled();
        expect(mockedAxiosPostValidate).toBeCalled();
        expect(mockedAxiosPostSubmit).toBeCalled();
        expect(response.statusCode).toBe(400);
      });
  });
});
