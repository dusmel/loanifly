import request from 'supertest';
import app from '../app';

import cleanDb from './config/cleanTables';

const users = {
  admin: {
    email: 'hadad.bwenge@andela.com',
    password: 'hadad123',
    role: 0,
  },
};


describe('Users endpoints ', () => {
  test('for signing up', async () => request(app)
    .post('/api/v1/auth/signup')
    .send(users.admin)
    .then((res) => {
      console.log(res.body);
    }));
});

afterAll(async () => cleanDb());
