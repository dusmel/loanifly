"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DB =
/*#__PURE__*/
function () {
  function DB() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.DATABASE_URL;

    _classCallCheck(this, DB);

    this.pool = new _pg.default.Pool({
      connectionString: url
    });
  }

  _createClass(DB, [{
    key: "runQuery",
    value: function () {
      var _runQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(query) {
        var params,
            response,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
                _context.prev = 1;
                _context.next = 4;
                return this.pool.query(query, params);

              case 4:
                response = _context.sent;
                return _context.abrupt("return", {
                  response: response
                });

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", {
                  error: _context.t0
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function runQuery(_x) {
        return _runQuery.apply(this, arguments);
      }

      return runQuery;
    }()
  }, {
    key: "defineUser",
    value: function () {
      var _defineUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var query, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n        CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY NOT NULL ,\n        name varchar(100) NOT NULL,\n        email varchar(100) NOT NULL,\n        password text NOT NULL,\n        role int,\n        date date DEFAULT NOW());";
                _context2.prev = 1;
                _context2.next = 4;
                return this.pool.query(query);

              case 4:
                response = _context2.sent;
                return _context2.abrupt("return", response.rows);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", {
                  status: 500,
                  res: _context2.t0
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8]]);
      }));

      function defineUser() {
        return _defineUser.apply(this, arguments);
      }

      return defineUser;
    }()
  }, {
    key: "defineLoan",
    value: function () {
      var _defineLoan = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var query, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "\n        CREATE TABLE IF NOT EXISTS loans (id SERIAL PRIMARY KEY NOT NULL ,\n        amount int NOT NULL,\n        status int,\n        createdDate date DEFAULT NOW(),\n        grantedDate date ,\n        paidDate date );";
                _context3.prev = 1;
                _context3.next = 4;
                return this.pool.query(query);

              case 4:
                response = _context3.sent;
                return _context3.abrupt("return", response.rows);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", {
                  status: 500,
                  res: _context3.t0
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 8]]);
      }));

      function defineLoan() {
        return _defineLoan.apply(this, arguments);
      }

      return defineLoan;
    }()
  }, {
    key: "defineContributions",
    value: function () {
      var _defineContributions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var query, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "\n        CREATE TABLE IF NOT EXISTS contributions (id SERIAL PRIMARY KEY NOT NULL ,\n        amount int NOT NULL,\n        status int,\n        createdDate date DEFAULT NOW(),\n        paidDate date);";
                _context4.prev = 1;
                _context4.next = 4;
                return this.pool.query(query);

              case 4:
                response = _context4.sent;
                return _context4.abrupt("return", response.rows);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", {
                  status: 500,
                  res: _context4.t0
                });

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 8]]);
      }));

      function defineContributions() {
        return _defineContributions.apply(this, arguments);
      }

      return defineContributions;
    }()
  }]);

  return DB;
}();

var _default = DB;
exports.default = _default;