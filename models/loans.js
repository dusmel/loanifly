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
      //   console.log(error);

      return {
        status: false,
        message: error,
      };
    }
  },
};

export default loansModel;
