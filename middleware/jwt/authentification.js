import jwt from 'jsonwebtoken';
import keys from './keys';

const generateToken = payload => `bearer ${jwt.sign(payload, keys.secret, { expiresIn: '1h' })}`;

const verifyToken = (token, res) => {
  try {
    const user = jwt.verify(token, keys.secret);
    return user;
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'Authentification failed.',
    });
  }
};

export default { generateToken, verifyToken };
