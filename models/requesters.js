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

  /**
   * retrieve a single loan request
   *
   * @author mutombo jean-vincent
   * @param {string} loanId
   * @param {string} requesterId
   */
  async getOneRequest(loanId, requesterId) {
    try {
      const loan = await db.runQuery(queries.getOne, [loanId, requesterId]);
      return {
        status: true,
        data: loan.response.rows[0],
      };
    } catch (e) {
      return {
        status: false,
        message: e,
      };
    }
  },

  /**
   * cancel a single loan request
   *
   * @author mutombo jean-vincent
   * @param {string} requesterId
   */
  async cancelLoanRequest(requesterId) {
    try {
      const loan = await db.runQuery(queries.getPending, [requesterId]);
      const loanResult = loan.response.rows[0];

      if (!loanResult) {
        return {
          status: false,
          notFound: true,
          message: 'No pending loan request was found',
        };
      }

      await db.runQuery(queries.delete, [requesterId]);
      return {
        status: true,
        data: 'The loan requester was successfully deleted',
      };
    } catch (e) {
      return {
        status: false,
        message: e,
      };
    }
  },
  /**
   *
   * @author Grace Lungu
   * @param {number} amount
   */
  async updateLoan(amount, id) {
    try {
      const loan = await db.runQuery(queries.updateLoan, [amount, id]);
      if (loan.rowCount === 0) {
        return {
          status: false,
          message: 'The user does not have any pending loan',
        };
      }
      return {
        status: true,
        data: loan.response.rows,
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
