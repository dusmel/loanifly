"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _keys = _interopRequireDefault(require("./keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateToken = function generateToken(payload) {
  return "bearer ".concat(_jsonwebtoken.default.sign(payload, _keys.default.secret, {
    expiresIn: '1h'
  }));
};

var verifyToken = function verifyToken(token, res) {
  try {
    var user = _jsonwebtoken.default.verify(token, _keys.default.secret);

    return user;
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'Authentification failed.'
    });
  }
};

var _default = {
  generateToken: generateToken,
  verifyToken: verifyToken
};
exports.default = _default;