import mean from './mean'
import median from './median'
import { mode, numberMode, stringMode } from './mode'
import round from './round'
import split from './split'
import identity from './identity'

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

  // Collect lines, words, and word lengths
  const lines = split(sanitized, lineSeparator)
  const words = split(lines, wordSeparator)
  const letters = split(words, letterSeparator)

  // Create functions to calculate different types of averages over the word
  // length, as well as the most common words and letters
  const strToLength = (word) => (word.length)
  const meanLength = mean(strToLength)
  const medianLength = median(strToLength)
  const modalLength = numberMode(strToLength)
  const commonWords = stringMode(identity)
  const commonLetters = stringMode(identity)

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
    commonWords: commonWords(words),
    commonLetters: commonLetters(letters)
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
