'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('it handles an empty string', function () {
  const input = '';
  const output = (0, _index2.default)(input);
  expect(output.sanitized).toEqual('');
  expect(output.lines).toEqual([]);
  expect(output.words).toEqual([]);
  expect(output.letters).toEqual([]);
  expect(output.lineCount).toEqual(0);
  expect(output.wordCount).toEqual(0);
  expect(output.letterCount).toEqual(0);
  expect(output.mean).toEqual(0);
  expect(output.median).toEqual(0);
  expect(output.mode).toEqual([]);
  expect(output.commonWords).toEqual([]);
  expect(output.commonLetters).toEqual([]);
});

test('it handles real input', function () {
  const input = 'hi, my name is nick\nthis is a file';
  const output = (0, _index2.default)(input);
  expect(output.sanitized).toEqual('hi my name is nick\nthis is a file');
  expect(output.lines.sort()).toEqual(['hi my name is nick', 'this is a file'].sort());
  expect(output.words.sort()).toEqual(['hi', 'my', 'name', 'is', 'nick', 'this', 'is', 'a', 'file'].sort());
  expect(output.letters.sort()).toEqual(['h', 'i', 'm', 'y', 'n', 'a', 'm', 'e', 'i', 's', 'n', 'i', 'c', 'k', 't', 'h', 'i', 's', 'i', 's', 'a', 'f', 'i', 'l', 'e'].sort());
  expect(output.lineCount).toEqual(2);
  expect(output.wordCount).toEqual(9);
  expect(output.letterCount).toEqual(25);
  expect(output.mean).toEqual(2.8);
  expect(output.median).toEqual(2);
  expect(output.mode.sort()).toEqual([2, 4].sort());
  expect(output.commonWords).toEqual(['is']);
  expect(output.commonLetters).toEqual(['i']);
});

describe('letters from outside the basic latin alphabet', function () {
  test('it handles cyrillic', function () {
    const input = 'Лорем ипсум долор сит амет.';
    const output = (0, _index2.default)(input);
    expect(output.sanitized).toEqual('лорем ипсум долор сит амет');
    expect(output.lineCount).toEqual(1);
    expect(output.wordCount).toEqual(5);
    expect(output.letterCount).toEqual(22);
    expect(output.mean).toEqual(4.4);
    expect(output.median).toEqual(5);
    expect(output.mode).toEqual([5]);
  });

  test('it handles a right to left alphabet such as arabic', function () {
    const input = 'إحكام فهرست القادة أخر من.';
    const output = (0, _index2.default)(input);
    expect(output.sanitized).toEqual('إحكام فهرست القادة أخر من');
    expect(output.lineCount).toEqual(1);
    expect(output.wordCount).toEqual(5);
    expect(output.letterCount).toEqual(21);
    expect(output.mean).toEqual(4.2);
    expect(output.median).toEqual(5);
    expect(output.mode).toEqual([5]);
  });

  test('it handles letters from mutiple alphabets', function () {
    const input = 'Лорем Hello إحكام';
    const output = (0, _index2.default)(input);
    expect(output.sanitized).toEqual('лорем hello إحكام');
    expect(output.lineCount).toEqual(1);
    expect(output.wordCount).toEqual(3);
    expect(output.letterCount).toEqual(15);
    expect(output.mean).toEqual(5);
    expect(output.median).toEqual(5);
    expect(output.mode).toEqual([5]);
  });
});