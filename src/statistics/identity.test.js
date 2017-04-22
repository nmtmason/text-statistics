import identity from './identity'

test('it returns the value given', function () {
  expect(identity(undefined)).toEqual(undefined)
  expect(identity('hello')).toEqual('hello')
  expect(identity(0)).toEqual(0)
})
