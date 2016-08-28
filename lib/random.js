
const BOUNDLIMIT = Math.pow(2, 16)

function randomNumbers(count, bound) {
  if (bound >= BOUNDLIMIT) {
    throw new Error('cannot safely generate numbers above 16-bits')
  }

  const nums = []

  // keep asking for random values until we have as many as needed
  while (nums.length < count) {
    // we could ask for more numbers here, but let's just keep this simple.
    const vals = new Uint16Array(count)
    window.crypto.getRandomValues(vals)

    // inspect all of the values we received
    for (let x of vals) {
      // discard values in the upper bound (bias)
      if (x >= BOUNDLIMIT - BOUNDLIMIT % bound) {
        continue
      }

      // save good values
      nums.push(x % bound)

      // we're done once we have what we need
      if (nums.length === count) {
        return nums
      }
    }
  }
}

module.exports = {
  randomNumbers,
}
