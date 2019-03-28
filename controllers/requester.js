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
    const { id } = req.user;
    const response = await requesterModel.getOneRequest(loanId, id);

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
