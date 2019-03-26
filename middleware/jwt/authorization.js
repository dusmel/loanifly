import verifyToken from './authentification';

// use as middlewares in routes which check authorization and authentification via verifyToken
const authorizeAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  const user = verifyToken(token, res);
  if (user.role === 'admin') {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeRequester = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  const user = verifyToken(token, res);
  if (user.role === 'requester') {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeContributor = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  const user = verifyToken(token, res);
  if (user.role === 'contributor') {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeAdminAndRequester = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  const user = verifyToken(token, res);
  if (user.role === 'admin' || user.role === 'requester') {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeAdminAndContributor = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  const user = verifyToken(token, res);
  if (user.role === 'admin' || user.role === 'contributor') {
    next();
    return true;
  }
  return res.status(403).json({
    status: 403,
    error: 'Forbidden',
  });
};

const authorizeRequesterAndContributor = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  const user = verifyToken(token, res);
  if (user.role === 'requester' || user.role === 'contributor') {
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
