// passhelp - MIT License - https://passhelp.github.io
// Copyright 2016 Jacob Peddicord

import * as phrase from './phrase';

describe('phrase generator', () => {

  it('generates phrases', () => {
    const pass = phrase.generate(5);
    expect(pass.split(' ').length).toBe(5);
  });

  it('uses special characters as separators when requested', () => {
    const pass = phrase.generate(5, true);
    expect(pass).toMatch(/^\S+$/);
    expect(pass).toMatch(/(\W|\d)/);
  });

});
