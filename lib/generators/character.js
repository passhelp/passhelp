const random = require('../random');

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const ALPHA_UPPER = ALPHA.toUpperCase();
const NUMBERS = '1234567890';
const SYMBOLS = '!@#$%^&*()`~-_=+[]{};:\'"<>,./?\\|';
const LOOKALIKES = /[Il1O0\|]/g;

class Alphabet {
  constructor(sets, exclude) {
    this._sets = sets
    this._exclude = exclude
  }
  get characters() {
    let chars = this._sets.join('')
    if (this._exclude) {
      chars = chars.replace(this._exclude, '')
    }
    return chars
  }
  get sets() {
    return this._sets
  }
  findCharacter(c) {
    for (let i = 0; i < this._sets.length; i++) {
      if (this._sets[i].includes(c)) {
        return i;
      }
    }
    throw new Error('logic error: character not found in alphabet sets')
  }
}

const ALPHABETS = {
  full: new Alphabet([ALPHA, ALPHA_UPPER, NUMBERS, SYMBOLS]),
  full_friendly: new Alphabet([ALPHA, ALPHA_UPPER, NUMBERS, SYMBOLS], LOOKALIKES),
  alphanumeric: new Alphabet([ALPHA, ALPHA_UPPER, NUMBERS]),
  alphanumeric_friendly: new Alphabet([ALPHA, ALPHA_UPPER, NUMBERS], LOOKALIKES),
  numeric: new Alphabet([NUMBERS]),
  nonalpha: new Alphabet([NUMBERS, SYMBOLS]),
  hex: new Alphabet([NUMBERS + 'abcdef']),
}

function generate(length, alphabet, exhaustive = true) {
  const chars = alphabet.characters
  const used = alphabet.sets.map(() => false)

  // it's just not logically possible, come on
  if (exhaustive && used.length > length) {
    throw new Error('cannot generate an exhaustive password shorter than the number of alphabet sets')
  }

  // the (simple) magic
  // XXX: prefer string concatenation (optimization)
  const passChars = [];
  const nums = random.randomNumbers(length, chars.length)
  for (let n of nums) {
    const c = chars[n]
    passChars.push(c)

    // bookkeeping
    if (exhaustive) {
      const alphaIndex = alphabet.findCharacter(c)
      used[alphaIndex] = true;
    }
  }

  if (exhaustive) {
    // throw out the password if it doesn't use all sets and an exhaustive password was requested
    const allUsed = used.reduce((prev, curr) => prev && curr, true)
    if (!allUsed) {
      return generate(length, alphabet, exhaustive)
    }
  }

  return passChars.join('')
}


module.exports = {
  generate,
  alphabets: ALPHABETS
}
