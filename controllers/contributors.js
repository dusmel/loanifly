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
<<<<<<< HEAD
  async viewTotalContributions(req, res) {
    const response = await contributorsModel.viewContributions(req.user);

    const contributions = response.data.rows;
    let total = 0;
    contributions.map(data => {
      total += data.amount;
    });
    return res.status(200).json({
      status: 200,
      data: [{ total }]
    });
  }
=======
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
>>>>>>> 7e4b0c736b4cd692ef17d90de9a03ed4702f1c01
};

export default contributorController;
