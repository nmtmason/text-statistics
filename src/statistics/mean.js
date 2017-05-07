const mean = (items = []) => {
  if (items.length === 0) {
    return 0
  }
  const total = items.reduce(function (subtotal, item) {
    return subtotal + item
  }, 0)
  return total / items.length
}

export default mean
