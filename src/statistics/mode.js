function mode (valToKey, keyToVal) {
  return function (input = []) {
    // No need to process a zero length array.
    if (input.length === 0) {
      return []
    }

    // Generate a map of word lengths and the frequency that they appear.
    // A JavaScript object may not be the best data structure for this, but as
    // only lengths (i.e. numbers) are being stored as keys, there won't be
    // collisions with other properties.
    let highestFrequency = 0
    const frequencies = input.reduce(function (frequencies, val) {
      const key = valToKey(val)
      const frequency = (frequencies[key] || 0) + 1
      if (frequency > highestFrequency) {
        highestFrequency = frequency
      }
      frequencies[key] = frequency
      return frequencies
    }, {})

    // Using the frequency map, find the lengths which appear the most.
    // There may be several modes for the words given.
    const keys = Object.keys(frequencies)
    const modes = keys.reduce(function (modes, key) {
      const frequency = frequencies[key]
      if (frequency === highestFrequency) {
        modes.push(keyToVal(key))
      }
      return modes
    }, [])

    return modes
  }
}

export default mode
