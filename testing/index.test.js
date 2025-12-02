import request from 'supertest';
import app from './index.js';

test('esto debe de crear un token (suma 1 + 2 = 3)', async () => {
  const response = await request(app)
    .post('/')
    .send({ a: 1, b: 2 })
    .expect(200);

  expect(response.body).toEqual({ result: 3 });
});