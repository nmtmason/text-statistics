"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mode = (itemToKey, keyToItem) => (items = []) => {
  if (items.length === 0) {
    return [];
  }

  // Generate a map of items and the frequency that they appear.
  let highestFrequency = 0;
  const frequencies = items.reduce(function (frequencies, item) {
    const key = itemToKey(item);
    const frequency = (frequencies[key] || 0) + 1;
    if (frequency > highestFrequency) {
      highestFrequency = frequency;
    }
    frequencies[key] = frequency;
    return frequencies;
  }, {});

  // Using the frequency map, find the items which appear the most.
  // If interested in the n most frequent, we could create another data
  // structure to map frequencies to their items and pluck them out.
  const keys = Object.keys(frequencies);
  const modes = keys.reduce(function (modes, key) {
    const frequency = frequencies[key];
    if (frequency === highestFrequency) {
      modes.push(keyToItem(key));
    }
    return modes;
  }, []);

  return modes;
};

// JavaScript has to limitations when using obejcts as frequency maps
// 1. Only strings can be used as keys.
// 2. Keys must not collide with other built-in object properties.
//
// To ovecome this, the mode function expects two functions to convert values
// into keys and back again.
// As well as the mode function itself, we expose two helper functions which
// allow Numbers and Strings to be stored as keys.
// Numbers are converted to a string before being converted back to a number.
// Strings are prefixed with an identifier to stop collisions. This is removed
// when the value is retrieved.

const numToStr = num => String(num);
const strToNum = str => Number(str);
const numberMode = mode(numToStr, strToNum);

const boxKey = val => `FREQUENCY-${val}`;
const unboxKey = val => val.substring(10);
const stringMode = mode(boxKey, unboxKey);

exports.default = mode;
exports.mode = mode;
exports.numberMode = numberMode;
exports.stringMode = stringMode;