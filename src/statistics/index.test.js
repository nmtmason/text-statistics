import statistics from './index'

test('it handles an empty string', function () {
  const input = ''
  const output = statistics(input)
  expect(output.sanitized).toEqual('')
  expect(output.lines).toEqual([])
  expect(output.words).toEqual([])
  expect(output.letters).toEqual([])
  expect(output.lineCount).toEqual(0)
  expect(output.wordCount).toEqual(0)
  expect(output.letterCount).toEqual(0)
  expect(output.mean).toEqual(0)
  expect(output.median).toEqual(0)
  expect(output.mode).toEqual([])
  expect(output.commonWords).toEqual([])
  expect(output.commonLetters).toEqual([])
})

test('it handles real input', function () {
  const input = 'hi, my name is nick\nthis is a file'
  const output = statistics(input)
  expect(output.sanitized).toEqual('hi my name is nick\nthis is a file')
  expect(output.lines.sort()).toEqual(['hi my name is nick', 'this is a file'].sort())
  expect(output.words.sort()).toEqual(['hi', 'my', 'name', 'is', 'nick', 'this', 'is', 'a', 'file'].sort())
  expect(output.letters.sort()).toEqual(['h', 'i', 'm', 'y', 'n', 'a', 'm', 'e', 'i', 's', 'n', 'i', 'c', 'k', 't', 'h', 'i', 's', 'i', 's', 'a', 'f', 'i', 'l', 'e'].sort())
  expect(output.lineCount).toEqual(2)
  expect(output.wordCount).toEqual(9)
  expect(output.letterCount).toEqual(25)
  expect(output.mean).toEqual(2.8)
  expect(output.median).toEqual(2)
  expect(output.mode.sort()).toEqual([2, 4].sort())
  expect(output.commonWords).toEqual(['is'])
  expect(output.commonLetters).toEqual(['i'])
})
