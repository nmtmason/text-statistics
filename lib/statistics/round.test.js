'use strict';

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("it doesn't round whole numbers", function () {
  expect((0, _round2.default)(1)).toEqual(1);
});

test('it rounds more than one decimal point', function () {
  expect((0, _round2.default)(1.33333)).toEqual(1.3);
});

test('it rounds up', function () {
  expect((0, _round2.default)(1.55)).toEqual(1.6);
});

test('it rounds down', function () {
  expect((0, _round2.default)(1.54)).toEqual(1.5);
});