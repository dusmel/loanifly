import contributorsModel from '../models/contributors';

const contributorController = {
  async contribute(req, res) {
    const response = await contributorsModel.contribute(req.body, req.user);
    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message,
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data.rows,
    });
  },
  async viewContributions(req, res) {
    const response = await contributorsModel.viewContributions(req.user);
    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message,
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data.rows,
    });
  },
  async viewTotalContributions(req, res) {
    const response = await contributorsModel.viewContributions(req.user);

    const contributions = response.data.rows;
    let total = 0;
    contributions.map((data) => {
      total += data.amount;
    });
    return res.status(200).json({
      status: 200,
      data: [{ total }],
    });
  },
  async payContribution(req, res) {
    const response = await contributorsModel.payContribution(req.params.id);
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
    const response = await contributorsModel.viewLoans();
    const loans = response.data.rows;
    let total = 0;
    loans.map((loan) => {
      total += loan.amount;
    });

    return res.status(200).json({
      status: 200,
      data: [{ total }],
    });
  },

  async viewAllContributions(req, res) {
    const contributions = await contributorsModel.viewAllContributions();
    if (!contributions.status) {
      return res.status(400).json({
        status: 400,
        message: contributions.message
      });
    } 
      return res.status(200).json({
        status: 200,
        data: contributions
      });
    
  },

  async viewContribution(req, res) {
    const contribution = await contributorsModel.viewContribution(
      req.params.id
    );
    if (!contribution.status) {
      return res.status(400).json({
        status: 400,
        message: contribution.message
      });
    } 
      return res.status(200).json({
        status: 200,
        data: contribution
      });
    
  },
};

export default contributorController;
