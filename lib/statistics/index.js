'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = exports.stringMode = exports.numberMode = exports.mode = exports.median = exports.mean = undefined;

var _mean = require('./mean');

var _mean2 = _interopRequireDefault(_mean);

var _median = require('./median');

var _median2 = _interopRequireDefault(_median);

var _mode = require('./mode');

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

var _split = require('./split');

var _split2 = _interopRequireDefault(_split);

var _identity = require('./identity');

var _identity2 = _interopRequireDefault(_identity);

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

  const strToLength = word => word.length;
  const meanLength = (0, _mean2.default)(strToLength);
  const medianLength = (0, _median2.default)(strToLength);
  const modalLength = (0, _mode.numberMode)(strToLength);

  const commonWords = (0, _mode.stringMode)(_identity2.default);
  const commonLetters = (0, _mode.stringMode)(_identity2.default);

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
    commonWords: commonWords(words),
    commonLetters: commonLetters(letters)
  };
}

exports.default = statistics;
exports.mean = _mean2.default;
exports.median = _median2.default;
exports.mode = _mode.mode;
exports.numberMode = _mode.numberMode;
exports.stringMode = _mode.stringMode;
exports.round = _round2.default;