"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// http://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript

const round = (value, precision = 1) => {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
};

exports.default = round;