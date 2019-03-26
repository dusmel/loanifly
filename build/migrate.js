"use strict";

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _index.default();

var migrate = function migrate() {
  var users = db.defineUser();
  var loans = db.defineLoan();
  var contributions = db.defineContributions();
  return [users, loans, contributions];
};

console.log(migrate());