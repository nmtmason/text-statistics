'use strict';

var _mean = require('./mean');

var _mean2 = _interopRequireDefault(_mean);

var _identity = require('./identity');

var _identity2 = _interopRequireDefault(_identity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('the mean function', function () {
  test('it returns a function', function () {
    expect((0, _mean2.default)(_identity2.default)).toBeInstanceOf(Function);
  });
});

describe('identity mean function operating on numbers', function () {
  const identityMean = (0, _mean2.default)(_identity2.default);

  test('it handles undefined values', function () {
    expect(identityMean()).toEqual(0);
  });

  test('it handles an empty array', function () {
    const input = [];
    expect(identityMean(input)).toEqual(0);
  });

  test('it handles arrays containing one number', function () {
    const input = [4];
    expect(identityMean(input)).toEqual(4);
  });

  test('it handles arrays containing two numbers', function () {
    const input = [4, 4];
    expect(identityMean(input)).toEqual(4);
  });

  test('it handles arrays containing two different numbers', function () {
    const input = [4, 5];
    expect(identityMean(input)).toEqual(4.5);
  });

  test('it handles any array containing many different numbers', function () {
    const input = [1, 6, 11, 4, 5, 2, 7, 5];
    expect(identityMean(input)).toEqual(5.125);
  });
});

test('mean number of vowels in an array of strings', function () {
  const numberOfVowels = str => {
    const match = str.match(/[aeiou]/gi);
    return match === null ? 0 : match.length;
  };
  const meanNumberOfVowels = (0, _mean2.default)(numberOfVowels);
  const input = ['hello', 'world', 'bob', 'along'];
  expect(meanNumberOfVowels(input)).toEqual(1.5);
});