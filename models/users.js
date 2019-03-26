import bcrypt from 'bcrypt';
import DB from './index';
import queries from './queries/users';

const db = new DB();

const userModel = {
  async create(body) {
    const { email, role } = body;
    let { password } = body;
    password = await bcrypt.hash(password, bcrypt.genSaltSync(8));
    const name = email
      .split('@')[0]
      .split('.')
      .join(' ');
    const values = [name, email, password, role];
    const { response } = await db.runQuery(queries.create, values);
    return response.rows;
  },
};

export default userModel;
