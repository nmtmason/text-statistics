'use strict';

var _median = require('./median');

var _median2 = _interopRequireDefault(_median);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('it handles undefined input', function () {
  expect((0, _median2.default)()).toEqual(0);
});

test('it handles an empty array', function () {
  const input = [];
  expect((0, _median2.default)(input)).toEqual(0);
});

test('it handles arrays containing one number', function () {
  const input = [4];
  expect((0, _median2.default)(input)).toEqual(4);
});

test('it handles arrays containing two numbers', function () {
  const input = [5, 5];
  expect((0, _median2.default)(input)).toEqual(5);
});

test('it handles arrays containing two different numbers', function () {
  const input = [5, 4];
  expect((0, _median2.default)(input)).toEqual(4.5);
});

test('it handles odd length arrays', function () {
  const input = [4, 2, 2, 5, 2, 3, 6];
  expect((0, _median2.default)(input)).toEqual(3);
});

test('it handles even length arrays', function () {
  const input = [5, 2, 4, 6];
  expect((0, _median2.default)(input)).toEqual(4.5);
});

test('it handles arrays containing unsorted numbers', function () {
  const input = [5, 2, 8, 5];
  expect((0, _median2.default)(input)).toEqual(5);
});

test('it handles arrays containing sorted numbers', function () {
  const input = [1, 2, 6];
  expect((0, _median2.default)(input)).toEqual(2);
});