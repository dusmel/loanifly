import loansModel from '../models/loans';

const loansController = {
  async grantLoan(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    const response = await loansModel.grant(status, id);
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
export default loansController;
