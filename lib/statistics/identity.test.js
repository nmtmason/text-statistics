'use strict';

var _identity = require('./identity');

var _identity2 = _interopRequireDefault(_identity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('it returns the value given', function () {
  expect((0, _identity2.default)(undefined)).toEqual(undefined);
  expect((0, _identity2.default)('hello')).toEqual('hello');
  expect((0, _identity2.default)(0)).toEqual(0);
});