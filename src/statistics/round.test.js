import round from './round'

test("it doesn't round whole numbers", function () {
  expect(round(1)).toEqual(1)
})

test('it rounds more than one decimal point', function () {
  expect(round(1.33333)).toEqual(1.3)
})

test('it rounds up', function () {
  expect(round(1.55)).toEqual(1.6)
})

test('it rounds down', function () {
  expect(round(1.54)).toEqual(1.5)
})
