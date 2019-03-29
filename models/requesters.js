import DB from './index';
import queries from './queries/requesters';
import loansQueries from './queries/loans';

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
        message: 'message from catch...',
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
  async getOneRequest(loanId, requesterId = null) {
    try {
      const loan = !requesterId
        ? await db.runQuery(loansQueries.getById, [loanId])
        : await db.runQuery(queries.getOne, [loanId, requesterId]);
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

  /**
   * pay the loan
   *
   * @author Karl MUSINGO
   * @param {int} requesterId
   */
  async payLoan(id) {
    try {
      const { response } = await db.runQuery(queries.payLoan, [new Date(), id]);

      if (response.rowCount === 0) {
        return {
          status: false,
          message: 'the user does not have a loan which is granted',
        };
      }

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
