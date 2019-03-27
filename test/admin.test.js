import auth from '../middleware/jwt/authentification';

test('just trying', () => {
  expect(auth).toBeDefined();
});
