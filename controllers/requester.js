import requesterModel from '../models/requesters';

const requesterController = {
  async requestLoan(req, res) {
    const { id } = req.user;
    const { amount } = req.body;
    const response = await requesterModel.create(amount, id);
    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message,
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data,
    });
  },

  async getSingleRequest(req, res) {
    const loanId = req.params.id;
    const { role, id } = req.user;

    // check whether the user role is admin or requester
    const response =      role === 0
        ? await requesterModel.getOneRequest(loanId, null)
        : await requesterModel.getOneRequest(loanId, id);

    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message,
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data,
    });
  },

  async cancelLoanRequest(req, res) {
    const { id } = req.user;

    const response = await requesterModel.cancelLoanRequest(id);
    if (!response.status) {
      if (response.notFound) {
        return res.status(404).json({
          status: 404,
          message: response.message,
        });
      }

      return res.status(500).json({
        status: 500,
        message: response.message,
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data,
    });
  },
  async updateLoan(req, res) {
    const { amount } = req.body;
    const { id } = req.user;

    const response = await requesterModel.updateLoan(amount, id);

    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message,
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data,
    });
  },
  async payLoan(req, res) {
    const { id } = req.user;
    const response = await requesterModel.payLoan(id);
    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message,
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data,
    });
  },
};
export default requesterController;
