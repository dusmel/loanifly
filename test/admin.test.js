import request from 'supertest';
import app from '../app';

let userId = 1;
const idLoan = 2;

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

  describe('Should get all users', () => {
    test('get users', async () => {
      await request(app)
        .get('/api/v1/users')
        .set('Authorization', tokens.admin)
        .then((res) => {
          userId = res.body.users[0].id;
          expect(res.body.status).toBe(200);
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .get('/api/v1/users')
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.error).toBe('Non-authorised user');
        });
    });

    test('missing tokens', async () => {
      await request(app)
        .get('/api/v1/users')
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });
  });

  describe('Should grant loans ', () => {
    test('fail loans request', async () => {
      await request(app)
        .put(`/api/v1/loans/${idLoan}`)
        .set('Authorization', tokens.admin)
        .then((res) => {
          expect(res.body.status).toBe(400);
        });
    });

    test('requester loan request', async () => {
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

    test('grant the loans request', async () => {
      await request(app)
        .put(`/api/v1/loans/${idLoan}`)
        .set('Authorization', tokens.admin)
        .then((res) => {
          expect(res.body.status).toBe(400);
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .put(`/api/v1/loans/${idLoan}`)
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.error).toBe('Non-authorised user');
        });
    });

    test('missing tokens', async () => {
      await request(app)
        .get(`/api/v1/loans/${idLoan}`)
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });
  });

  describe('Should get a single user', () => {
    test('get user', async () => {
      await request(app)
        .get(`/api/v1/user/${userId}`)
        .set('Authorization', tokens.admin)
        .then((res) => {
          expect(res.body.status).toBe(200);
        });
    });

    test('validate id', async () => {
      await request(app)
        .get('/api/v1/user/string')
        .set('Authorization', tokens.admin)
        .then((res) => {
          expect(res.body.status).toBe(400);
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .get(`/api/v1/user/${userId}`)
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.error).toBe('Non-authorised user');
        });
    });

    test('missing tokens', async () => {
      await request(app)
        .get(`/api/v1/user/${userId}`)
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });
  });

  describe('Should delete a single user', () => {
    test('delete user', async () => {
      await request(app)
        .delete(`/api/v1/user/${userId}`)
        .set('Authorization', tokens.admin)
        .then((res) => {
          expect(res.body.status).toBe(200);
        });
    });

    test('validate id', async () => {
      await request(app)
        .delete('/api/v1/user/string')
        .set('Authorization', tokens.admin)
        .then((res) => {
          expect(res.body.status).toBe(400);
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .delete(`/api/v1/user/${userId}`)
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.error).toBe('Non-authorised user');
        });
    });

    test('missing tokens', async () => {
      await request(app)
        .delete(`/api/v1/user/${userId}`)
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });
  });

  describe('Should get all loans request', () => {
    test('get loans', async () => {
      await request(app)
        .get('/api/v1/loans')
        .set('Authorization', tokens.admin)
        .then((res) => {
          expect(res.body.status).toBe(200);
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .get('/api/v1/loans')
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.error).toBe('Non-authorised user');
        });
    });

    test('missing tokens', async () => {
      await request(app)
        .get('/api/v1/loans')
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });
  });

  describe('Should get all contributions', () => {
    test('get contributions', async () => {
      await request(app)
        .get('/api/v1/contributions/admin')
        .set('Authorization', tokens.admin)
        .then((res) => {
          expect(res.body.status).toBe(200);
        });
    });

    test('with invalid tokens', async () => {
      await request(app)
        .get('/api/v1/contributions/admin')
        .set('Authorization', tokens.requester)
        .then((res) => {
          expect(res.body.error).toBe('Non-authorised user');
        });
    });

    test('missing tokens', async () => {
      await request(app)
        .get('/api/v1/contributions/admin')
        .then((res) => {
          expect(res.body.error).toBe('Authorization missing');
        });
    });
  });
};

export default testAdmin;
