import * as random from '../random';
import * as character from './character';
import rawWords from './words';

let _words = [];
function getWords(): string[] {
  if (_words.length === 0) {
    _words = rawWords.split(',');
  }
  return _words;
}

export function generate(numWords: number, specials: boolean = false): string {
  // for sanity, require 3 words so that there are at least two separator characters.
  // this means we can guarantee at least 1 symbol and 1 number, if asked for
  if (numWords < 3) {
    throw new Error('minimum 3 words required');
  }

  // load em up
  const words = getWords();

  let separators = '';
  if (specials) {
    separators = character.generate(numWords - 1, character.alphabets.nonalpha, true);
  } else {
    separators = ' '.repeat(numWords - 1);
  }

  const nums = random.randomNumbers(numWords, words.length);
  let pass = '';
  nums.forEach((n, i) => {
    let w = words[n];

    if (i === 0 && specials) {
      w = w.charAt(0).toUpperCase() + w.slice(1);
    }

    pass += w;

    // add in a separator character if this isn't the last word
    if (i < numWords - 1) {
      pass += separators[i];
    }
  });

  return pass;
}
