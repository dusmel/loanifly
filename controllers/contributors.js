import contributorsModel from "../models/contributors";

const contributorController = {
  async contribute(req, res) {
    const response = await contributorsModel.contribute(req.body, req.user);
    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data.rows
    });
  },
  async viewContributions(req, res) {
    const response = await contributorsModel.viewContributions(req.user);
    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data.rows
    });
  },
  async viewLoans(req, res) {
    const response = await contributorsModel.viewLoans();
    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message
      });
    }
    const loans = response.data.rows;
    let total = 0;
    loans.map(loan => {
      total += loan.amount;
    });

    return res.status(200).json({
      status: 200,
      data: [{ total }]
    });
  }
};

export default contributorController;
