import dotenv from 'dotenv';
import DB from '../models/index';

dotenv.config();

const migrate = async (url) => {
  const database = url
    .toString()
    .split('/')
    .slice(-1)
    .pop();

  const db = new DB(url);

  const users = await db.defineUser();
  console.log(
    users.length === 0 ? `${database} : Table users created` : users.res,
  );

  const loans = await db.defineLoan();
  console.log(
    loans.length === 0 ? `${database} Table loans created` : loans.res,
  );

  const contributions = await db.defineContributions();
  console.log(
    contributions.length === 0
      ? `${database} Table contributions created`
      : contributions.res,
  );

  db.pool.end();
};

// Migrate the development database
migrate(process.env.DATABASE_URL);
