'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mean(input = []) {
  // No need to process a zero length array.
  if (input.length === 0) {
    return 0;
  }
  // Could skip a pass of the array if needed and just reference the lengths
  // in the return statement but it adds slightly to readibility.
  const sorted = input.sort(function (x, y) {
    return x - y;
  });
  const even = sorted.length % 2 === 0;
  // In an odd array, the middle value will be the true middle. In an even array
  // the middle value will be the value left of the true middle.
  // e.g. For an odd array [1, *2*, 3]
  // e.g. For an even array [1, *2*, 3, 4]
  const middle = Math.ceil(sorted.length / 2) - 1;
  return even
  // Take the average of the two middle values
  ? (0, _round2.default)((sorted[middle] + sorted[middle + 1]) / 2)
  // Take the middle value itself
  : sorted[middle];
}

exports.default = mean;