'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const reducer = delimeter => (items, item) => {
  return item === '' ? items : items.concat(item.split(delimeter));
};

const split = (input, delimeter) => {
  if (!Array.isArray(input)) {
    input = [input];
  }
  return input.reduce(reducer(delimeter), []);
};

exports.default = split;