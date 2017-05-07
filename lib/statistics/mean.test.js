'use strict';

var _mean = require('./mean');

var _mean2 = _interopRequireDefault(_mean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('it handles undefined values', function () {
  expect((0, _mean2.default)()).toEqual(0);
});

test('it handles an empty array', function () {
  const input = [];
  expect((0, _mean2.default)(input)).toEqual(0);
});

test('it handles arrays containing one number', function () {
  const input = [4];
  expect((0, _mean2.default)(input)).toEqual(4);
});

test('it handles arrays containing two numbers', function () {
  const input = [4, 4];
  expect((0, _mean2.default)(input)).toEqual(4);
});

test('it handles arrays containing two different numbers', function () {
  const input = [4, 5];
  expect((0, _mean2.default)(input)).toEqual(4.5);
});

test('it handles any array containing many different numbers', function () {
  const input = [1, 6, 11, 4, 5, 2, 7, 5];
  expect((0, _mean2.default)(input)).toEqual(5.125);
});