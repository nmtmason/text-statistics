'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = exports.stringMode = exports.numberMode = exports.mode = exports.median = exports.mean = undefined;

var _xregexp = require('xregexp');

var _xregexp2 = _interopRequireDefault(_xregexp);

var _mean = require('./mean');

var _mean2 = _interopRequireDefault(_mean);

var _median = require('./median');

var _median2 = _interopRequireDefault(_median);

var _mode = require('./mode');

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

var _split = require('./split');

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const statistics = (input, {
  // Case insensitve
  caseSensitive = false,
  // Replace everything but letters and spaces
  textSanitizer = (0, _xregexp2.default)('[^\\pL\\d\\s]', 'ig'),
  // Match CRLF and LF
  lineSeparator = /\r\n?|\n/,
  // Words delimited by spaces
  wordSeparator = /\s+/,
  // Every letter separated
  letterSeparator = ''
} = {}) => {
  // Strip back to letters and spaces
  const text = caseSensitive ? input : input.toLowerCase();
  const sanitized = _xregexp2.default.replace(text, textSanitizer, '');

  // Collect lines, words, and word lengths
  const lines = (0, _split2.default)(sanitized, lineSeparator);
  const words = (0, _split2.default)(lines, wordSeparator);
  const letters = (0, _split2.default)(words, letterSeparator);

  // Convenience functions for creating other functions
  const compose = (a, b) => x => a(b(x));
  const map = fn => items => items.map(fn);

  // Create average functions operating on word lengths
  const strToLength = word => word.length;
  const meanLength = compose(_mean2.default, map(strToLength));
  const medianLength = compose(_median2.default, map(strToLength));
  const modalLength = compose(_mode.numberMode, map(strToLength));

  return {
    sanitized: sanitized,
    lines: lines,
    words: words,
    letters: letters,
    lineCount: lines.length,
    wordCount: words.length,
    letterCount: letters.length,
    mean: (0, _round2.default)(meanLength(words)),
    median: (0, _round2.default)(medianLength(words)),
    mode: modalLength(words),
    commonWords: (0, _mode.stringMode)(words),
    commonLetters: (0, _mode.stringMode)(letters)
  };
};

exports.default = statistics;
exports.mean = _mean2.default;
exports.median = _median2.default;
exports.mode = _mode.mode;
exports.numberMode = _mode.numberMode;
exports.stringMode = _mode.stringMode;
exports.round = _round2.default;