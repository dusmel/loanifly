import tokens from './users.test';
import app from '../app';

import request from 'supertest';

describe('Contributor tests', () => {
  describe('Place contribution', () => {
    test('Wrong token', async () => {
      request(app)
        .post('/api/v1/contributions')
        .set('Authorization', `token`)
        .send({ amount: 100 })
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authentification failed.');
        });
    });
  });

  describe('Get own contribution', () => {
    test('Missing Authorization Header', async () => {
      request(app)
        .get('/api/v1/contributions')
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authorization missing');
        });
    });

    test('Wrong token', async () => {
      request(app)
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
      request(app)
        .get('/api/v1/contributions/total')
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authorization missing');
        });
    });

    test('Wrong token', async () => {
      request(app)
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
      request(app)
        .get('/api/v1/loans/total')
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authorization missing');
        });
    });

    test('Wrong token', async () => {
      request(app)
        .get('/api/v1/loans/total')
        .set('Authorization', `token`)
        .then(res => {
          expect(res.body.status).toBe(403);
          expect(res.body.error).toBe('Authentification failed.');
        });
    });
  });
});
