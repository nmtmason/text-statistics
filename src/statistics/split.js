function reducer (delimeter) {
  return function (items, item) {
    return (
      item === ''
      ? items
      : items.concat(item.split(delimeter))
    )
  }
}

function split (input, delimeter) {
  if (!Array.isArray(input)) {
    input = [input]
  }
  return input.reduce(reducer(delimeter), [])
}

export default split
