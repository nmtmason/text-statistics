import mean from './mean'
import identity from './identity'

describe('the mean function', function () {
  test('it returns a function', function () {
    expect(mean(identity)).toBeInstanceOf(Function)
  })
})

describe('identity mean function operating on numbers', function () {
  const identityMean = mean(identity)

  test('it handles undefined values', function () {
    expect(identityMean()).toEqual(0)
  })

  test('it handles an empty array', function () {
    const input = []
    expect(identityMean(input)).toEqual(0)
  })

  test('it handles arrays containing one number', function () {
    const input = [4]
    expect(identityMean(input)).toEqual(4)
  })

  test('it handles arrays containing two numbers', function () {
    const input = [4, 4]
    expect(identityMean(input)).toEqual(4)
  })

  test('it handles arrays containing two different numbers', function () {
    const input = [4, 5]
    expect(identityMean(input)).toEqual(4.5)
  })

  test('it handles any array containing many different numbers', function () {
    const input = [1, 6, 11, 4, 5, 2, 7, 5]
    expect(identityMean(input)).toEqual(5.125)
  })
})

test('mean number of vowels in an array of strings', function () {
  const numberOfVowels = (str) => {
    const match = str.match(/[aeiou]/gi)
    return match === null ? 0 : match.length
  }
  const meanNumberOfVowels = mean(numberOfVowels)
  const input = ['hello', 'world', 'bob', 'along']
  expect(meanNumberOfVowels(input)).toEqual(1.5)
})
