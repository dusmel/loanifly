import jwt from 'jsonwebtoken';
import keys from './keys';

const token = {
  generate(payload) {
    return `bearer ${jwt.sign(payload, keys.secret, { expiresIn: '1h' })}`;
  },
  verify(userToken, res) {
    try {
      const user = jwt.verify(userToken, keys.secret);
      return user;
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: 'Authentification failed.',
      });
    }
  },
};

export default token;
