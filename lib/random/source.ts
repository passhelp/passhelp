type RNGFunc = <T extends Uint8Array | Uint16Array | Uint32Array>(
  arrayType: {new(length: number): T}, count: number
) => T;

// detect what platform we're on and set getRandomArray appropriately.
export const getRandomArray: RNGFunc = (function (): RNGFunc {
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
