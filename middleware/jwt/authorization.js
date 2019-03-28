import verifyToken from "./authentification";

const tokenHandler = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return {
      status: false,
      message: "Authorization missing"
    };
  }
  const token = authorization.split(" ")[1];
  const user = verifyToken.verify(token, res);
  req.user = user.data;
  return user;
};

// use as middlewares in routes which check authorization and authentification via verifyToken
const authorizeAdmin = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (!user.status) {
    return res.status(403).json({
      status: 403,
      error: user.message
    });
  }
  if (user.data.role === 0) {
    next();
  }
};

const authorizeRequester = (req, res, next) => {
  const user = tokenHandler(req, res);
  console.log(user);
  if (!user.status) {
    return res.status(403).json({
      status: 403,
      error: user.message
    });
  }
  console.log(user.data.role);
  if (user.data.role === 1) {
    next();
  }
};

const authorizeContributor = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (!user.status) {
    return res.status(403).json({
      status: 403,
      error: user.message
    });
  }
  if (user.data.role === 2) {
    next();
  }
};

const authorizeAdminAndRequester = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (!user.status) {
    return res.status(403).json({
      status: 403,
      error: user.message
    });
  }
  if (user.data.role === 0 || user.data.role === 1) {
    next();
  }
};

const authorizeAdminAndContributor = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (!user.status) {
    return res.status(403).json({
      status: 403,
      error: user.message
    });
  }
  if (user.data.role === 0 || user.data.role === 2) {
    next();
  }
};

const authorizeRequesterAndContributor = (req, res, next) => {
  const user = tokenHandler(req, res);
  if (!user.status) {
    return res.status(403).json({
      status: 403,
      error: user.message
    });
  }
  if (user.data.role === 1 || user.data.role === 2) {
    next();
  }
};
export default {
  authorizeAdmin,
  authorizeRequester,
  authorizeContributor,
  authorizeAdminAndRequester,
  authorizeAdminAndContributor,
  authorizeRequesterAndContributor
};
