import request from 'supertest';
import app from '../app';

import cleanDb from './config/cleanTables';

const users = {
  admin: {
    email: 'admin.admin@andela.com',
    password: '123456',
    role: 0
  },
  requester: {
    email: 'requester.requester@andela.com',
    password: '123456',
    role: 1
  },
  contributor: {
    email: 'contributor.contributor@andela.com',
    password: '123456',
    role: 2
  }
};

const tokens = {};

beforeAll(async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send(users.admin)
    .then(res => {
      console.log(res.body);
      expect(res.body.status).toBe(200);
      tokens.admin = res.body.token;
    });

  await request(app)
    .post('/api/v1/auth/signup')
    .send(users.requester)
    .then(res => {
      console.log(res.body);
      expect(res.body.status).toBe(200);
      tokens.requester = res.body.token;
    });

  await request(app)
    .post('/api/v1/auth/signup')
    .send(users.contributor)
    .then(res => {
      console.log(res.body);
      expect(res.body.status).toBe(200);
      tokens.contributor = res.body.token;
    });
});

describe('Example for getting the token', () => {
  test('Example', async () => console.log(tokens));
});

afterAll(async () => await cleanDb());

export default tokens;
