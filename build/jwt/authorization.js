"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authentification = _interopRequireDefault(require("./authentification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// use as middlewares in routes which check authorization and authentification via verifyToken
var authorizeAdmin = function authorizeAdmin(req, res, next) {
  var authorization = req.headers.authorization;
  var token = authorization.split(' ')[1];
  var user = (0, _authentification.default)(token, res);

  if (user.role === 'admin') {
    next();
    return true;
  }

  return res.status(403).json({
    status: 403,
    error: 'Forbidden'
  });
};

var authorizeRequester = function authorizeRequester(req, res, next) {
  var authorization = req.headers.authorization;
  var token = authorization.split(' ')[1];
  var user = (0, _authentification.default)(token, res);

  if (user.role === 'requester') {
    next();
    return true;
  }

  return res.status(403).json({
    status: 403,
    error: 'Forbidden'
  });
};

var authorizeContributor = function authorizeContributor(req, res, next) {
  var authorization = req.headers.authorization;
  var token = authorization.split(' ')[1];
  var user = (0, _authentification.default)(token, res);

  if (user.role === 'contributor') {
    next();
    return true;
  }

  return res.status(403).json({
    status: 403,
    error: 'Forbidden'
  });
};

var authorizeAdminAndRequester = function authorizeAdminAndRequester(req, res, next) {
  var authorization = req.headers.authorization;
  var token = authorization.split(' ')[1];
  var user = (0, _authentification.default)(token, res);

  if (user.role === 'admin' || user.role === 'requester') {
    next();
    return true;
  }

  return res.status(403).json({
    status: 403,
    error: 'Forbidden'
  });
};

var authorizeAdminAndContributor = function authorizeAdminAndContributor(req, res, next) {
  var authorization = req.headers.authorization;
  var token = authorization.split(' ')[1];
  var user = (0, _authentification.default)(token, res);

  if (user.role === 'admin' || user.role === 'contributor') {
    next();
    return true;
  }

  return res.status(403).json({
    status: 403,
    error: 'Forbidden'
  });
};

var authorizeRequesterAndContributor = function authorizeRequesterAndContributor(req, res, next) {
  var authorization = req.headers.authorization;
  var token = authorization.split(' ')[1];
  var user = (0, _authentification.default)(token, res);

  if (user.role === 'requester' || user.role === 'contributor') {
    next();
    return true;
  }

  return res.status(403).json({
    status: 403,
    error: 'Forbidden'
  });
};

var _default = {
  authorizeAdmin: authorizeAdmin,
  authorizeRequester: authorizeRequester,
  authorizeContributor: authorizeContributor,
  authorizeAdminAndRequester: authorizeAdminAndRequester,
  authorizeAdminAndContributor: authorizeAdminAndContributor,
  authorizeRequesterAndContributor: authorizeRequesterAndContributor
};
exports.default = _default;