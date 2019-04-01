import auth from '../middleware/jwt/authentification';
import cleanDb from './config/cleanTables';

test('just trying', () => {
  expect(auth).toBeDefined();
});

afterAll(async () => await cleanDb());
