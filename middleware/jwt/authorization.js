import verifyToken from './authentification';

const tokenHandler = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({
      status: 403,
      error: 'Authorization missing',
    });
  }
  const token = authorization.split(' ')[1];
  const user = verifyToken.verify(token, res);
  return user;
};

// use as middlewares in routes which check authorization and authentification via verifyToken
const authorizeAdmin = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (user.role === 0) {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeRequester = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (user.role === 1) {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeContributor = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (user.role === 2) {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeAdminAndRequester = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (user.role === 0 || user.role === 1) {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeAdminAndContributor = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (user.role === 0 || user.role === 2) {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeRequesterAndContributor = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (user.role === 1 || user.role === 2) {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};
export default {
  authorizeAdmin,
  authorizeRequester,
  authorizeContributor,
  authorizeAdminAndRequester,
  authorizeAdminAndContributor,
  authorizeRequesterAndContributor,
};
