import request from 'supertest';
import app from '../app';

const testAdmin = (tokens, credentials) => {
  describe('Should login the admin', () => {
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

    test('validate request body ', async () => {
      await request(app)
        .post('/api/v1/auth/signin')
        .then((res) => {
          expect(res.body.status).toBe(400);
        });
    });

    test('validate request email ', async () => {
      await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'wrong email',
          password: credentials.password,
        })
        .then((res) => {
          expect(res.body.status).toBe(400);
        });
    });

    test('validate request password ', async () => {
      await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: credentials.email,
          password: 'wrong password',
        })
        .then((res) => {
          expect(res.body.status).toBe(401);
        });
    });
  });
};

export default testAdmin;
