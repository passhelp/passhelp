import * as random from '../random';

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const ALPHA_UPPER = ALPHA.toUpperCase();
const NUMBERS = '1234567890';
const SYMBOLS = '!@#$%^&*()`~-_=+[]{};:\'"<>,./?\\|';
const LOOKALIKES = /[Il1O0\|]/g;

class Alphabet {
  _sets: Array<string>;
  _exclude: RegExp;

  constructor(sets: Array<string>, exclude: RegExp = null) {
    this._sets = sets;
    this._exclude = exclude;
  }
  get characters(): string {
    let chars = this._sets.join('');
    if (this._exclude) {
      chars = chars.replace(this._exclude, '');
    }
    return chars;
  }
  get sets(): Array<string> {
    return this._sets;
  }
  findCharacter(c: string): number {
    for (let i = 0; i < this._sets.length; i++) {
      if (this._sets[i].includes(c)) {
        return i;
      }
    }
    throw new Error('logic error: character not found in alphabet sets');
  }
}

export const alphabets = {
  full: new Alphabet([ALPHA, ALPHA_UPPER, NUMBERS, SYMBOLS]),
  full_friendly: new Alphabet([ALPHA, ALPHA_UPPER, NUMBERS, SYMBOLS], LOOKALIKES),
  alphanumeric: new Alphabet([ALPHA, ALPHA_UPPER, NUMBERS]),
  alphanumeric_friendly: new Alphabet([ALPHA, ALPHA_UPPER, NUMBERS], LOOKALIKES),
  numeric: new Alphabet([NUMBERS]),
  nonalpha: new Alphabet([NUMBERS, SYMBOLS]),
  hex: new Alphabet([NUMBERS + 'abcdef']),
};

export function generate(length: number, alphabet: Alphabet, exhaustive: boolean = true): string {
  const chars = alphabet.characters;
  const used = alphabet.sets.map(() => false);

  // it's just not logically possible, come on
  if (exhaustive && used.length > length) {
    throw new Error('cannot generate an exhaustive password shorter than the number of alphabet sets');
  }

  // the (simple) magic
  let pass = '';
  const nums = random.randomNumbers(length, chars.length);
  for (let n of nums) {
    const c = chars[n];
    pass += c;

    // bookkeeping
    if (exhaustive) {
      const alphaIndex = alphabet.findCharacter(c);
      used[alphaIndex] = true;
    }
  }

  if (exhaustive) {
    // throw out the password if it doesn't use all sets and an exhaustive password was requested
    const allUsed = used.reduce((prev, curr) => prev && curr, true);
    if (!allUsed) {
      return generate(length, alphabet, exhaustive);
    }
  }

  return pass;
}

