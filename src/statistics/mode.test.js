import mode from './mode.js'

const numToStr = (num) => (String(num))
const strToNum = (str) => (Number(str))
const numberMode = mode(numToStr, strToNum)

test('it returns a function', function () {
  expect(mode(numToStr, strToNum)).toBeInstanceOf(Function)
})

test('it handles undefined input', function () {
  expect(numberMode()).toEqual([])
})

test('it handles an empty array', function () {
  const input = []
  expect(numberMode(input)).toEqual([])
})

test('it handles one number', function () {
  const input = [4]
  expect(numberMode(input)).toEqual([4])
})

test('it handles two numbers', function () {
  const input = [5, 5]
  expect(numberMode(input)).toEqual([5])
})

test('it handles two different numbers', function () {
  const input = [4, 5]
  expect(numberMode(input)).toEqual([4, 5])
})

test('it handles odd length arrays', function () {
  const input = [4, 2, 2, 5, 2, 3, 6]
  expect(numberMode(input)).toEqual([2])
})

test('it handles even length arrays', function () {
  const input = [5, 2, 4, 6]
  expect(numberMode(input)).toEqual([2, 4, 5, 6])
})

test('it handles unsorted numbers', function () {
  const input = [5, 2, 8, 5]
  expect(numberMode(input)).toEqual([5])
})

test('it handles sorted numbers', function () {
  const input = [1, 2, 6]
  expect(numberMode(input)).toEqual([1, 2, 6])
})

test('it handles multiple modes', function () {
  const bimodal = [1, 2, 1, 2, 5]
  const trimodal = [3, 3, 1, 1, 5, 4, 4]
  expect(numberMode(bimodal)).toEqual([1, 2])
  expect(numberMode(trimodal)).toEqual([1, 3, 4])
})