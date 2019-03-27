"use strict";

var _index = _interopRequireDefault(require("../models/index"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

var migrate =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(url) {
    var database, db, users, loans, contributions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            database = url.toString().split("/").slice(-1).pop();
            db = new _index.default(url);
            _context.next = 4;
            return db.defineUser();

          case 4:
            users = _context.sent;
            console.log(users.length === 0 ? "".concat(database, " : Table users created") : users.res);
            _context.next = 8;
            return db.defineLoan();

          case 8:
            loans = _context.sent;
            console.log(loans.length === 0 ? "".concat(database, " Table loans created") : loans.res);
            _context.next = 12;
            return db.defineContributions();

          case 12:
            contributions = _context.sent;
            console.log(contributions.length === 0 ? "".concat(database, " Table contributions created") : contributions.res);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function migrate(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Migrate the development database


migrate(process.env.DATABASE_URL); // Migrate the testing database

migrate(process.env.TEST_DATABASE);