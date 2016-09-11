
const UPPER = Math.pow(2, 16);

export function randomNumbers(count, bound): Array<number> {
  if (bound >= UPPER) {
    throw new Error('cannot safely generate numbers above 16-bits');
  }

  const nums = [];

  // keep asking for random values until we have as many as needed
  while (nums.length < count) {
    // we could ask for more numbers here, but let's just keep this simple.
    const vals = new Uint16Array(count);
    getRandomValues(vals);

    // inspect all of the values we received
    for (let i = 0; i < vals.length; i++) {
      const x = vals[i];

      // discard values in the upper bound (bias)
      if (x >= UPPER - UPPER % bound) {
        continue;
      }

      // save good values
      nums.push(x % bound);

      // we're done once we have what we need
      if (nums.length === count) {
        return nums;
      }
    }
  }
}

// detect what platform we're on and set getRandomValues appropriately.
const getRandomValues = (function (): (array: ArrayBufferView) => ArrayBufferView {
  // function to return when crypto isn't supported
  const errFunc = err => {
    throw new Error(err);
  };

  // browser
  if (typeof window === 'object') {
    if (typeof window.crypto === 'object' && typeof window.crypto.getRandomValues === 'function') {
      return vals => window.crypto.getRandomValues(vals);
    } else {
      return errFunc('browser does not support crypto.getRandomValues');
    }
  }

  // TODO: node crypto module
})();

