import request from 'supertest';
import app from '../app';

import cleanDb from './config/cleanTables';

import testAdmin from './admin.test';
import testContributor from './contributors.test';
import testRequester from './requester.test';

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
      tokens.admin = res.body.token;
    });

  await request(app)
    .post('/api/v1/auth/signup')
    .send(users.requester)
    .then(res => {
      tokens.requester = res.body.token;
    });

  await request(app)
    .post('/api/v1/auth/signup')
    .send(users.contributor)
    .then(res => {
      tokens.contributor = res.body.token;
    });
});

testAdmin(tokens, {
  email: users.admin.email,
  password: users.admin.password
});
testContributor(tokens, {
  email: users.contributor.email,
  password: users.contributor.password
});
testRequester(tokens, {
  email: users.requester.email,
  password: users.requester.password
});

afterAll(async () => cleanDb());
