import median from './median'
import identity from './identity'

describe('the median function', function () {
  test('it returns a function', function () {
    expect(median(identity)).toBeInstanceOf(Function)
  })
})

describe('identity median function operating on numbers', function () {
  const identityMedian = median(identity)

  test('it handles undefined input', function () {
    expect(identityMedian()).toEqual(0)
  })

  test('it handles an empty array', function () {
    const input = []
    expect(identityMedian(input)).toEqual(0)
  })

  test('it handles arrays containing one number', function () {
    const input = [4]
    expect(identityMedian(input)).toEqual(4)
  })

  test('it handles arrays containing two numbers', function () {
    const input = [5, 5]
    expect(identityMedian(input)).toEqual(5)
  })

  test('it handles arrays containing two different numbers', function () {
    const input = [5, 4]
    expect(identityMedian(input)).toEqual(4.5)
  })

  test('it handles odd length arrays', function () {
    const input = [4, 2, 2, 5, 2, 3, 6]
    expect(identityMedian(input)).toEqual(3)
  })

  test('it handles even length arrays', function () {
    const input = [5, 2, 4, 6]
    expect(identityMedian(input)).toEqual(4.5)
  })

  test('it handles arrays containing unsorted numbers', function () {
    const input = [5, 2, 8, 5]
    expect(identityMedian(input)).toEqual(5)
  })

  test('it handles arrays containing sorted numbers', function () {
    const input = [1, 2, 6]
    expect(identityMedian(input)).toEqual(2)
  })
})

test('median number of vowels in an array of strings', function () {
  const numberOfVowels = (str) => {
    const match = str.match(/[aeiou]/gi)
    return match === null ? 0 : match.length
  }
  const medianNumberOfVowels = median(numberOfVowels)
  const input = ['hello', 'world', 'bob', 'along']
  expect(medianNumberOfVowels(input)).toEqual(1.5)
})
