import userModel from '../models/users';
import token from '../middleware/jwt/authentification';
import DB from '../models';

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
    console.log(">>>>>>>>>", users);
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
  }
};
export default userController;
