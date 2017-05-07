import mean from './mean'

test('it handles undefined values', function () {
  expect(mean()).toEqual(0)
})

test('it handles an empty array', function () {
  const input = []
  expect(mean(input)).toEqual(0)
})

test('it handles arrays containing one number', function () {
  const input = [4]
  expect(mean(input)).toEqual(4)
})

test('it handles arrays containing two numbers', function () {
  const input = [4, 4]
  expect(mean(input)).toEqual(4)
})

test('it handles arrays containing two different numbers', function () {
  const input = [4, 5]
  expect(mean(input)).toEqual(4.5)
})

test('it handles any array containing many different numbers', function () {
  const input = [1, 6, 11, 4, 5, 2, 7, 5]
  expect(mean(input)).toEqual(5.125)
})
