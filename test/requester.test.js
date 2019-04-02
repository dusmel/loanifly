import request from 'supertest';
import app from '../app';

let loanId;
const testRequester = (tokens, credentials) => {
  describe('Should login the requester', () => {
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

  describe('Should place loan requester', () => {
    test('loan request', async () => {
      await request(app)
        .post('/api/v1/loans')
        .set('Authorization', tokens.requester)
        .send({
          amount: 2000,
        })
        .then((res) => {
          expect(res.body.status).toBe(200);
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .post('/api/v1/loans')
        .set('Authorization', 'invalid tokens')
        .send({
          amount: 2000,
        })
        .then((res) => {
          expect(res.body.error).toBe('Authentification failed.');
        });
    });

    test('without tokens', async () => {
      await request(app)
        .post('/api/v1/loans')
        .send({
          amount: 2000,
        })
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });
  });

  describe('Should view loan request', () => {
    test('view single loan', async () => {
      await request(app)
        .get(`/api/v1/loans/${loanId}`)
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.status).toBe(200);
        });
    });

    test('with no tokens', async () => {
      await request(app)
        .get(`/api/v1/loans/${loanId}`)
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .get(`/api/v1/loans/${loanId}`)
        .set('Authorization', 'invalid tokens')
        .send({
          amount: 2000,
        })
        .then((res) => {
          expect(res.body.error).toBe('Authentification failed.');
        });
    });
  });

  describe('Should update a loan request', () => {
    test('Update a single', async () => {
      await request(app)
        .put('/api/v1/loans')
        .set('Authorization', tokens.requester)
        .send({
          amount: 3000,
        })
        .then((res) => {
          expect(res.body.status).toBe(200);
        });
    });

    test('with no tokens', async () => {
      await request(app)
        .put('/api/v1/loans')
        .send({
          amount: 3000,
        })
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .put('/api/v1/loans')
        .set('Authorization', 'invalid tokens')
        .send({
          amount: 3000,
        })
        .then((res) => {
          expect(res.body.error).toBe('Authentification failed.');
        });
    });
  });

  describe('Should cancel a loan request', () => {
    test('Cancel a single', async () => {
      await request(app)
        .delete('/api/v1/loans')
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.status).toBe(200);
        });
    });

    test('with no tokens', async () => {
      await request(app)
        .delete('/api/v1/loans')
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .delete('/api/v1/loans')
        .set('Authorization', 'invalid tokens')
        .then((res) => {
          expect(res.body.error).toBe('Authentification failed.');
        });
    });
  });

  describe('Should validate the update of a loan request', () => {
    test('No pending loan found', async () => {
      await request(app)
        .put('/api/v1/loans')
        .set('Authorization', tokens.requester)
        .send({
          amount: 3000,
        })
        .then((res) => {
          expect(res.body.message).toBe(
            'The user does not have any pending loan',
          );
        });
    });

    test('No amount in the body', async () => {
      await request(app)
        .put('/api/v1/loans')
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.status).toBe(400);
        });
    });
  });

  describe('Should validate view loan request', () => {
    test('with invalid id', async () => {
      await request(app)
        .get('/api/v1/loans/string')
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.status).toBe(400);
        });
    });
  });

  describe('Should validate pay loan request', () => {
    test('no granted loan', async () => {
      await request(app)
        .put('/api/v1/loans/pay')
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.status).toBe(500);
        });
    });
  });
};

export default testRequester;
