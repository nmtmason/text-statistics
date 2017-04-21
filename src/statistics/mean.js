function mean (input = []) {
  // No need to process zero length array.
  if (input.length === 0) {
    return 0
  }
  const total = input.reduce(function (subtotal, val) {
    return subtotal + val
  }, 0)
  return total / input.length
}

export default mean
