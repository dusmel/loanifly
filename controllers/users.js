import userModel from '../models/users';
import token from '../middleware/jwt/authentification';

const userController = {
  async signup(req, res) {
    const newUser = await userModel.create(req.body);
    delete newUser[0].password;
    const newToken = token.generate(newUser[0]);
    return res.status(200).json({
      status: 200,
      user: newUser,
      token: newToken,
    });
  },
};
export default userController;
