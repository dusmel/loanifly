import DB from '../../models/index';

const db = new DB();

const cleanDB = async () => {
  const queryText = 'TRUNCATE TABLE users, loans, contributions CASCADE';
  try {
    await db.runQuery(queryText);
    db.pool.end();
  } catch (e) {
    return {
      status: false,
      message: e,
    };
  }
  return console.log('Test Database cleaned');
};

export default cleanDB;
