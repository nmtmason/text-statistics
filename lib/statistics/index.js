'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = exports.mode = exports.median = exports.mean = exports.statistics = undefined;

var _mean = require('./mean.js');

var _mean2 = _interopRequireDefault(_mean);

var _median = require('./median.js');

var _median2 = _interopRequireDefault(_median);

var _mode = require('./mode.js');

var _mode2 = _interopRequireDefault(_mode);

var _round = require('./round.js');

var _round2 = _interopRequireDefault(_round);

var _split = require('./split.js');

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function statistics(input, {
  // Case insensitve
  caseSensitive = false,
  // Replace everything but letters and spaces
  textSanitizer = /[^a-zA-Z\d\s:]/g,
  // Match CRLF and LF
  lineSeparator = /\r\n?|\n/,
  // Words delimited by spaces
  wordSeparator = /\s+/,
  // Every letter separated
  letterSeparator = ''
} = {}) {
  // Strip back to letters and spaces
  const text = caseSensitive ? input : input.toLowerCase();
  const sanitized = text.replace(textSanitizer, '');

  // Collect lines, words, and word lengths.
  const lines = (0, _split2.default)(sanitized, lineSeparator);
  const words = (0, _split2.default)(lines, wordSeparator);
  const letters = (0, _split2.default)(words, letterSeparator);
  const wordLengths = words.map(word => word.length);

  // Generate a mode function which operates on numbers.
  // Mode is calculated by generating a frequency map.
  // The JavaScript object can only use strings as it's keys, so
  // we need a way of turning numeric values into strings and then back again.
  const numToStr = num => String(num);
  const strToNum = str => Number(str);
  const numberMode = (0, _mode2.default)(numToStr, strToNum);

  // Another limitation of using JavaScript objects for maps is the chance
  // of collisions with JavaScript reserved words.
  // We create another mode function which will prepend the value with an
  // identifier to stop this from happening
  const boxKey = val => `STATS_${val}`;
  const unboxKey = val => val.substring(6);
  const stringMode = (0, _mode2.default)(boxKey, unboxKey);

  return {
    sanitized: sanitized,
    lines: lines,
    words: words,
    letters: letters,
    lineCount: lines.length,
    wordCount: words.length,
    letterCount: letters.length,
    mean: (0, _round2.default)((0, _mean2.default)(wordLengths)),
    median: (0, _round2.default)((0, _median2.default)(wordLengths)),
    mode: numberMode(wordLengths),
    commonWords: stringMode(words),
    commonLetters: stringMode(letters)
  };
}

exports.default = statistics;
exports.statistics = statistics;
exports.mean = _mean2.default;
exports.median = _median2.default;
exports.mode = _mode2.default;
exports.round = _round2.default;