"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function mean(convert) {
  return function (items = []) {
    if (items.length === 0) {
      return 0;
    }
    const total = items.reduce(function (subtotal, item) {
      return subtotal + convert(item);
    }, 0);
    return total / items.length;
  };
}

exports.default = mean;