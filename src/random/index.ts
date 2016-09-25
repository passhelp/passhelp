import { getRandomArray } from './source';

const UPPER = Math.pow(2, 16);

export function randomNumbers(count: number, bound: number): number[] {
  if (bound >= UPPER) {
    throw new Error('cannot safely generate numbers above 16-bits');
  }

  const nums: number[] = [];

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
        break;
      }
    }
  }

  return nums;
}

