"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function median(convert) {
  return function (items = []) {
    if (items.length === 0) {
      return 0;
    }
    const sorted = items.sort(function (x, y) {
      return convert(x) - convert(y);
    });
    const even = sorted.length % 2 === 0;
    // In an odd array, the middle value will be the true middle. In an even array
    // the middle value will be the value left of the true middle.
    // e.g. For an odd array [1, *2*, 3]
    // e.g. For an even array [1, *2*, 3, 4]
    const middle = Math.ceil(sorted.length / 2) - 1;
    return even
    // Take the average of the two middle values
    ? (convert(sorted[middle]) + convert(sorted[middle + 1])) / 2
    // Take the middle value itself
    : convert(sorted[middle]);
  };
}

exports.default = median;