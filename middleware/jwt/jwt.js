import jwt from 'jsonwebtoken';
import keys from './keys';

const generateToken = payload => `bearer ${jwt.sign(payload, keys.secret)}`;

// use as middleware in routes
const verifyToken = (req, res, next) => {
  try {
    const { Authorization } = req.headers;
    const token = Authorization.split(' ')[1];
    const decoded = jwt.verify(token, keys.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'Authentification failed.',
    });
  }
};

export default { generateToken, verifyToken };
