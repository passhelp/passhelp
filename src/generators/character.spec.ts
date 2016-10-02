// passhelp - MIT License - https://passhelp.github.io
// Copyright 2016 Jacob Peddicord

import * as character from './character';

describe('character generator', () => {

  it('generates a password of the requested length', () => {
    const pass = character.generate(30, character.alphabets.full);
    expect(pass.length).toBe(30);
  });

  it('always includes all sets when exhaustive mode is used', () => {
    for (let i = 0; i < 100; i++) {
      const pass = character.generate(10, character.alphabets.alphanumeric, true);
      expect(pass).toMatch(/[A-Z]/);
      expect(pass).toMatch(/[a-z]/);
      expect(pass).toMatch(/[0-9]/);
    }
  });

  it('does not enforce all sets when exhaustive mode is off', () => {
    // technically, this has an infinite runtime. practically though, it'll end.
    let matched = true;
    while (matched) {
      const pass = character.generate(5, character.alphabets.alphanumeric, false);
      matched = /[0-9]/.test(pass);
    }
    // if we got to this point, then we found a non-exhaustive password.
    // cool, though there's not really anything to assert.
  });

  it('does not accept exhaustive mode if the length is too small', () => {
    expect(() => {
      character.generate(3, character.alphabets.full, true);
    }).toThrowError(/cannot generate an exhaustive/);
  });

  describe('alphabet', () => {

    it('full_friendly and alphanumeric_friendly never includes lookalikes', () => {
      for (let i = 0; i < 100; i++) {
        const full = character.generate(10, character.alphabets.full_friendly);
        expect(full).toMatch(/^[^Il1O0\|]+$/);
        const alphanum = character.generate(10, character.alphabets.alphanumeric_friendly);
        expect(alphanum).toMatch(/^[^Il1O0\|]+$/);
      }
    });

    it('numeric is only numbers', () => {
      for (let i = 0; i < 100; i++) {
        const full = character.generate(10, character.alphabets.numeric);
        expect(full).toMatch(/^[0-9]+$/);
      }
    });

    it('hex is only hex', () => {
      for (let i = 0; i < 100; i++) {
        const full = character.generate(10, character.alphabets.hex);
        expect(full).toMatch(/^[0-9a-f]+$/);
      }
    });

  });

});
