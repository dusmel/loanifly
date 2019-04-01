import tokens from './users.test';
import app from '../app';

import request from 'supertest';

import cleanDb from './config/cleanTables';

describe('Contributor tests', () => {
  describe('Place contribution', () => {
    test('Contribute', async () => {
      await request(app)
        .post('/api/v1/contributions')
        .set('Authorization', tokens.contributor)
        .send({ amount: 45 })
        .then(res => {
          expect(res.body.status).toBe(200);
          expect(res.body.data instanceof Array).toBe(true);
        });
    });

    test('Missing amount', async () => {
      await request(app)
        .post('/api/v1/contributions')
        .set('Authorization', tokens.contributor)
        .then(res => {
          expect(res.body.status).toBe(400);
          expect(res.body.message).toBe('amount is required');
        });
    });

    test('Wrong token', async () => {
      await request(app)
        .post('/api/v1/contributions')
        .set('Authorization', `token`)
        .send({ amount: 100 })
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authentification failed.');
        });
    });

    test('Missing token', async () => {
      await request(app)
        .post('/api/v1/contributions')
        .send({ amount: 100 })
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authorization missing');
        });
    });
  });

  describe('Get own contribution', () => {
    test('Missing Authorization Header', async () => {
      await request(app)
        .get('/api/v1/contributions')
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authorization missing');
        });
    });

    test('Wrong token', async () => {
      await request(app)
        .get('/api/v1/contributions')
        .set('Authorization', `token`)
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authentification failed.');
        });
    });
  });

  describe('Get total contributions', () => {
    test('Missing Authorization Header', async () => {
      await request(app)
        .get('/api/v1/contributions/total')
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authorization missing');
        });
    });

    test('Wrong token', async () => {
      await request(app)
        .get('/api/v1/contributions/total')
        .set('Authorization', `token`)
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authentification failed.');
        });
    });
  });

  describe('Get total loans', () => {
    test('Missing Authorization Header', async () => {
      await request(app)
        .get('/api/v1/loans/total')
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authorization missing');
        });
    });

    test('Wrong token', async () => {
      await request(app)
        .get('/api/v1/loans/total')
        .set('Authorization', `token`)
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authentification failed.');
        });
    });
  });
});

afterAll(async () => cleanDb());
