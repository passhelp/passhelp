const UPPER = Math.pow(2, 16);

export function randomNumbers(count: number, bound: number): Array<number> {
  if (bound >= UPPER) {
    throw new Error('cannot safely generate numbers above 16-bits');
  }

  const nums = [];

  // keep asking for random values until we have as many as needed
  while (nums.length < count) {
    // we could ask for more numbers here, but let's just keep this simple.
    const vals = getRandomArray(Uint16Array, count);

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

// detect what platform we're on and set getRandomArray appropriately.
type RNGFunc = <T extends Uint8Array | Uint16Array | Uint32Array>(
  arrayType: {new(length: number): T}, count: number
) => T;
const getRandomArray: RNGFunc = (function (): RNGFunc {
  // function to return when crypto isn't supported
  const errFunc = err => () => {
    throw new Error(err);
  };

  // browser
  if (typeof window === 'object') {
    if (typeof window.crypto === 'object' && typeof window.crypto.getRandomValues === 'function') {
      return (arrayType, count) => {
        const vals = new arrayType(count);
        window.crypto.getRandomValues(vals);
        return vals;
      };
    } else {
      return errFunc('browser does not support crypto.getRandomValues');
    }
  }

  // node
  if (typeof require === 'function') {
    const crypto = require('crypto');
    if (typeof crypto === 'object' && typeof crypto.randomBytes === 'function') {
      return (arrayType, count) => {
        // ask for enough random bytes to fill the provided buffer
        const byteBuf = crypto.randomBytes(count * arrayType.BYTES_PER_ELEMENT);
        // create a new view on the requested type
        return new arrayType(byteBuf.buffer);
      };
    } else {
      return errFunc('node version does not support crypto.randomBytes');
    }
  }

  return errFunc('unknown runtime environment; cannot find suitable RNG');
})();
