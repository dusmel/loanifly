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
      const result = await db.runQuery(queries.create, values);
      if (result.error && result.error.routine === '_bt_check_unique') {
        return {
          status: false,
          message: 'User with that EMAIL already exist',
        };
      }

      return {
        status: true,
        data: result.response.rows,
      };
    } catch (error) {
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

  async viewUsers(){
    const {response} = await db.runQuery(queries.getUsers);
    if(response.rowCount > 0){
      return {
        status: true,
        data: response.rows,
      }
    } else{
      return {
        status: true,
        message: 'no user found',
      }
    }
  },

  async viewUser(id){
    const {response} = await db.runQuery(queries.getUser, [id]);
    if(response.rowCount > 0){
      return {
        status: true,
        data: response.rows,
      }
    } else{
      return {
        status: true,
        message: 'the user not found',
      }
    }
  },
};


export default userModel;
