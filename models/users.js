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

    try {
      const { response } = await db.runQuery(queries.create, values);
      return {
        status: true,
        data: response.rows,
      };
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return {
          status: false,
          message: 'User with that EMAIL already exist',
        };
      }
      return {
        status: false,
        message: error,
      };
    }
  },
  async login(body) {
    const { email, password } = body;
    const { response } = await db.runQuery(queries.login, [email]);
    if (response.rowCount > 0) {
      const result = bcrypt.compareSync(password, response.rows[0].password);
      if (result) {
        return {
          status: true,
          data: response.rows,
        };
      }
    }
    return {
      status: false,
      message: 'wrong credential',
    };
  },
};

export default userModel;
