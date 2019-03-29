import DB from './index';
import queries from './queries/loans';

const db = new DB();

const loansModel = {
  async grant(status, id) {
    try {
      const loans = await db.runQuery(queries.getById, [id]);
      if (loans.response.rows.length === 0) {
        return {
          status: false,
          message: 'the loan does not exist...',
        };
      }
      if (loans.response.rows[0].status !== 0) {
        return {
          status: false,
          message:
            'The loan has to be pending in order to grant or reject it ...',
        };
      }
      const { response } = await db.runQuery(queries.grant, [
        status,
        (status === 1) ? new Date() : null,
        id,
      ]);

      return {
        status: true,
        data: response.rows,
      };
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  },

  async viewLoans(){
    const {response} = await db.runQuery(queries.getLoans);
    if(response.rowCount > 0){
      return {
        status: true,
        data: response.rows,
      }
    } else{
      return {
        status: true,
        message: 'no loan found',
      }
    }
  },
};

export default loansModel;
