import request from 'supertest';
import app from '../app';

describe('Check status endpoint', () => {
  jest.setTimeout(30000);
  test('Status 200', async () => {
    await request(app)
      .get('/api/status')
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
