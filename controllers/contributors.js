import contributorsModel from "../models/contributors";
const contributorController = {
  async contribute(req, res) {
    const response = await contributorsModel.contribute(req.body);
    if (!response.status) {
      return res.status(500).json({
        status: 500,
        message: response.message
      });
    }

    return res.status(200).json({
      status: 200,
      data: response.data
    });
  }
};

export default contributorController;