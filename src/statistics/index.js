import mean from './mean.js'
import median from './median.js'
import mode from './mode.js'
import round from './round.js'
import split from './split.js'

function statistics (
  input,
  {
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
  } = {}
) {
  // Strip back to letters and spaces
  const text = caseSensitive ? input : input.toLowerCase()
  const sanitized = text.replace(textSanitizer, '')

  // Collect lines, words, and word lengths.
  const lines = split(sanitized, lineSeparator)
  const words = split(lines, wordSeparator)
  const letters = split(words, letterSeparator)
  const wordLengths = words.map((word) => (word.length))

  // Generate a mode function which operates on numbers.
  // Mode is calculated by generating a frequency map.
  // The JavaScript object can only use strings as it's keys, so
  // we need a way of turning numeric values into strings and then back again.
  const numToStr = (num) => (String(num))
  const strToNum = (str) => (Number(str))
  const numberMode = mode(numToStr, strToNum)

  // Another limitation of using JavaScript objects for maps is the chance
  // of collisions with JavaScript reserved words.
  // We create another mode function which will prepend the value with an
  // identifier to stop this from happening
  const boxKey = (val) => (`STATS_${val}`)
  const unboxKey = (val) => (val.substring(6))
  const stringMode = mode(boxKey, unboxKey)

  return {
    sanitized: sanitized,
    lines: lines,
    words: words,
    letters: letters,
    lineCount: lines.length,
    wordCount: words.length,
    letterCount: letters.length,
    mean: round(mean(wordLengths)),
    median: round(median(wordLengths)),
    mode: numberMode(wordLengths),
    commonWords: stringMode(words),
    commonLetters: stringMode(letters)
  }
}

export default statistics

export {
  statistics,
  mean,
  median,
  mode,
  round
}
