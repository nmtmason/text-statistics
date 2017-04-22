import { mode, numberMode } from './mode'
import identity from './identity'

describe('the mode function', function () {
  test('it returns a function', function () {
    expect(mode(identity, identity)).toBeInstanceOf(Function)
  })
})

describe('the identity number mode operating on numbers', function () {
  const identityNumberMode = numberMode(identity)

  test('it handles undefined input', function () {
    expect(identityNumberMode()).toEqual([])
  })

  test('it handles an empty array', function () {
    const input = []
    expect(identityNumberMode(input)).toEqual([])
  })

  test('it handles arrays containing one number', function () {
    const input = [4]
    expect(identityNumberMode(input)).toEqual([4])
  })

  test('it handles arrays containing two numbers', function () {
    const input = [5, 5]
    expect(identityNumberMode(input)).toEqual([5])
  })

  test('it handles arrays containing two different numbers', function () {
    const input = [4, 5]
    expect(identityNumberMode(input)).toEqual([4, 5])
  })

  test('it handles odd length arrays', function () {
    const input = [4, 2, 2, 5, 2, 3, 6]
    expect(identityNumberMode(input)).toEqual([2])
  })

  test('it handles even length arrays', function () {
    const input = [5, 2, 4, 6]
    expect(identityNumberMode(input)).toEqual([2, 4, 5, 6])
  })

  test('it handles arrays containing unsorted numbers', function () {
    const input = [5, 2, 8, 5]
    expect(identityNumberMode(input)).toEqual([5])
  })

  test('it handles arrays containing sorted numbers', function () {
    const input = [1, 2, 6]
    expect(identityNumberMode(input)).toEqual([1, 2, 6])
  })

  test('it handles arrays containing multiple modes', function () {
    const bimodal = [1, 2, 1, 2, 5]
    const trimodal = [3, 3, 1, 1, 5, 4, 4]
    expect(identityNumberMode(bimodal)).toEqual([1, 2])
    expect(identityNumberMode(trimodal)).toEqual([1, 3, 4])
  })
})

test('modal number of vowels in an array of strings', function () {
  const numberOfVowels = (str) => {
    const match = str.match(/[aeiou]/gi)
    return match === null ? 0 : match.length
  }
  const modalNumberOfVowels = numberMode(numberOfVowels)
  const input = ['hello', 'world', 'bob', 'along']
  expect(modalNumberOfVowels(input)).toEqual([1, 2])
})
