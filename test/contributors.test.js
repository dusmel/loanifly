import request from 'supertest';
import app from '../app';

const testContributor = (tokens, credentials) => {
  describe('Should login the contributor', () => {
    test('signin', async () => {
      await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: credentials.email,
          password: credentials.password,
        })
        .then((res) => {
          expect(res.body.status).toBe(200);
        });
    });
  });
};

export default testContributor;
