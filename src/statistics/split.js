const reducer = (delimeter) => (items, item) => {
  return (
    item === ''
    ? items
    : items.concat(item.split(delimeter))
  )
}

const split = (input, delimeter) => {
  if (!Array.isArray(input)) {
    input = [input]
  }
  return input.reduce(reducer(delimeter), [])
}

export default split
