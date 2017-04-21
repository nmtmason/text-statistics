"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function mode(valToKey, keyToVal) {
  return function (input = []) {
    if (input.length === 0) {
      return [];
    }

    // Generate a map of items and the frequency that they appear.
    let highestFrequency = 0;
    const frequencies = input.reduce(function (frequencies, val) {
      const key = valToKey(val);
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
        modes.push(keyToVal(key));
      }
      return modes;
    }, []);

    return modes;
  };
}

exports.default = mode;