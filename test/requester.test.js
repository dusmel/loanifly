import request from 'supertest';
import app from '../app';

const testRequester = (tokens, credentials) => {
  describe('Should login the requester', () => {
    test('signin', async () => {
      await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: credentials.email,
          password: credentials.password
        })
        .then(res => {
          expect(res.body.status).toBe(200);
        });
    });
  });

  describe('Should place loan requester', () => {
    test('loan request', async () => {
      await request(app)
        .post('/api/v1/loans')
        .set('Authorization', tokens.requester)
        .send({
          amount: 2000
        })
        .then(res => {
          expect(res.body.status).toBe(200);
        });
    });
  });
};

export default testRequester;
