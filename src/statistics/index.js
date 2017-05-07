import XRegExp from 'xregexp'

import mean from './mean'
import median from './median'
import { mode, numberMode, stringMode } from './mode'
import round from './round'
import split from './split'

const statistics = (
  input,
  {
    // Case insensitve
    caseSensitive = false,
    // Replace everything but letters and spaces
    textSanitizer = XRegExp('[^\\pL\\d\\s]', 'ig'),
    // Match CRLF and LF
    lineSeparator = /\r\n?|\n/,
    // Words delimited by spaces
    wordSeparator = /\s+/,
    // Every letter separated
    letterSeparator = ''
  } = {}
) => {
  // Strip back to letters and spaces
  const text = caseSensitive ? input : input.toLowerCase()
  const sanitized = XRegExp.replace(text, textSanitizer, '')

  // Collect lines, words, and word lengths
  const lines = split(sanitized, lineSeparator)
  const words = split(lines, wordSeparator)
  const letters = split(words, letterSeparator)

  // Convenience functions for creating other functions
  const compose = (a, b) => (x) => a(b(x))
  const map = (fn) => (items) => items.map(fn)

  // Create average functions operating on word lengths
  const strToLength = (word) => word.length
  const meanLength = compose(mean, map(strToLength))
  const medianLength = compose(median, map(strToLength))
  const modalLength = compose(numberMode, map(strToLength))

  return {
    sanitized: sanitized,
    lines: lines,
    words: words,
    letters: letters,
    lineCount: lines.length,
    wordCount: words.length,
    letterCount: letters.length,
    mean: round(meanLength(words)),
    median: round(medianLength(words)),
    mode: modalLength(words),
    commonWords: stringMode(words),
    commonLetters: stringMode(letters)
  }
}

export default statistics

export {
  mean,
  median,
  mode,
  numberMode,
  stringMode,
  round
}
