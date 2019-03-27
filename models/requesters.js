import DB from './index';
import queries from './queries/requesters';

const db = new DB();

const requesterModel = {
  /**
   * model to create the loan request
   *
   * @author mutombo jean-vincent
   * @param {string} amount
   * @param {string} requesterId
   * @returns
   */
  async create(amount, requesterId) {
    try {
      // check if the requester as a unpaid loan or a rejected loan
      const unpaidLoan = await db.runQuery(queries.getNonPaid, [
        '2',
        '3',
        requesterId,
      ]);

      if (!unpaidLoan.response.rowCount) {
        const { response } = await db.runQuery(queries.create, [
          amount,
          requesterId,
        ]);

        return {
          status: true,
          data: response.rows,
        };
      }
      return {
        status: false,
        message: 'Oops, you still have an unpaid loan request',
      };
    } catch (e) {
      return {
        status: false,
        message: e,
      };
    }
  },
};

export default requesterModel;
