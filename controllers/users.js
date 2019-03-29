import userModel from '../models/users';
import token from '../middleware/jwt/authentification';

const userController = {
  async signup(req, res) {
    const newUser = await userModel.create(req.body);
    if (!newUser.status) {
      return res.status(400).json({
        status: 400,
        message: newUser.message,
      });
    }
    delete newUser.data[0].password;
    const newToken = token.generate(newUser.data[0]);
    return res.status(200).json({
      status: 200,
      user: newUser.data,
      token: newToken,
    });
  },

  async signin(req, res) {
    const loggedInUser = await userModel.login(req.body);
    if (!loggedInUser.status) {
      return res.status(401).json({
        status: 401,
        message: loggedInUser.message,
      });
    }
    delete loggedInUser.data[0].password;
    const newToken = token.generate(loggedInUser.data[0]);
    return res.status(200).json({
      status: 200,
      user: loggedInUser.data,
      token: newToken,
    });
  },
  async viewUsers(req, res){
    const users = await userModel.viewUsers();
    if (!users.status) {
      return res.status(400).json({
        status: 400,
        message: users.message,
      });
    } else{
      return res.status(200).json({
        status: 200,
        users: users.data,
      });
    }
  },

  async viewUser(req, res){
    const user = await userModel.viewUser(req.params.id);
    if (!user.status) {
      return res.status(400).json({
        status: 400,
        message: user.message,
      });
    } else{
      return res.status(200).json({
        status: 200,
        user: user.data,
      });
    }
  },

  async deleteUser(req, res){
    const user = await userModel.deleteUser(req.params.id);
    if (!user.status) {
      return res.status(400).json({
        status: 400,
        message: user.message,
      });
    } else{
      return res.status(200).json({
        status: 200,
        message: "Successfully Deleted",
      });
    }
  }
};
export default userController;
