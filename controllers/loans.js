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
  async viewLoans(req, res) {
    const loans = await loansModel.viewLoans();
    if (!loans.status) {
      return res.status(400).json({
        status: 400,
        message: loans.message
      });
    } 
      return res.status(200).json({
        status: 200,
        loans: loans.data
      });
    
  },

  async viewTotalPaidAmount(req, res) {
    const amount = await loansModel.viewTotalPaidAmount();
    if (!amount.status) {
      return res.status(400).json({
        status: 400,
        message: amount.message
      });
    } 
      return res.status(200).json({
        status: 200,
        amount: amount.data
      });
    
  },
};
export default loansController;
