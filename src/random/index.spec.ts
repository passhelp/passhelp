// passhelp - MIT License - https://passhelp.github.io
// Copyright 2016 Jacob Peddicord

import * as mockery from 'mockery';

describe('random', () => {

  it('generates numbers within a bound', () => {
    const random = require('./index');
    const nums = random.randomNumbers(100, 1234);

    for (let n of nums) {
      expect(n).toBeLessThan(1234);
    }

    expect(nums.length).toBe(100);
  });

  describe('mocked', () => {

    beforeEach(() => {
      mockery.enable({useCleanCache: true});
      mockery.registerAllowable('./index');
    });

    afterEach(() => {
      mockery.deregisterAll();
      mockery.disable();
    });

    it('throws out bias values', () => {
      mockery.registerMock('./source', {
        getRandomArray: () => {
          return new Uint16Array([
            1234,
            32768, // highest acceptable value
            32769, // thrown out
            4,
            60000, // thrown out
            56789, // thrown out
            12345,
            1111,  // more numbers than needed at this point
            111,
          ]);
        },
      });

      const random = require('./index');

      // ask for 4 'random' numbers with a max that will cause
      // a lot of numbers to fall into the 'bias' range: just over
      // half of the max bound
      const nums = random.randomNumbers(4, (2 ** 16) / 2 + 1);

      expect(nums).toEqual([1234, 32768, 4, 12345]);
    });

  });

});
