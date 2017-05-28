[**Launch the generator ➡️**](https://passhelp.github.io/generator/)

# the little password helper #

[![npm](https://img.shields.io/npm/v/passhelp.svg?maxAge=7200)](https://www.npmjs.com/package/passhelp)
[![Travis](https://img.shields.io/travis/passhelp/passhelp.svg?maxAge=7200)](https://travis-ci.org/passhelp/passhelp)

passhelp, or "the little password helper", is a tool and library to help you
generate secure and sane passwords.

## Tenets ##
* **Secure by default** - passhelp uses a secure RNG provided by your browser (WebCrypto) or NodeJS (crypto module).
* **Human-friendly** - passhelp suggests password schemes that are easier to remember and read.
* **Fast** - don't bother tweaking tons of options; get a usable password with minimal clicks.
* **No-nonsense** - your password is generated on the client side, not on someone else's server.
* **Simple & auditable** - the source is readable, avoids cleverness, and is tested.

## Usage ##

passhelp ships pure JavaScript and TypeScript definitions. Its API is small:

```javascript
const passhelp = require('passhelp');

// generate a 3 word passphrase
passhelp.phrase(3); // "allergy site poise"

// include uppercase, special, and digit characters
passhelp.phrase(3, true); // "Stylish:question8splinter"

// use a custom separator character
passhelp.phrase(3, false, '/'); // "slouch/proceeds/rapture"

// traditional 12 character all-random passphrase
passhelp.character(12, passhelp.alphabets.full); // "tDnx1>^Q>:Z="

// 12 characters, but omit look-alikes
passhelp.character(12, passhelp.alphabets.full_friendly); // "2hUk#y?x\r~&"

// 8 character alphanumeric for those silly banks. ensure that
// it has 1 digit, 1 upper-case and 1 lower-case character
passhelp.character(8, passhelp.alphabets.alphanumeric, true); // "A2nJEH4o"
```

All generators return strings. Available alphabets for the character generator are:

* `full`: Upper/lower-case, numbers, and symbols
* `full_friendly`: Like `full`, but excluding look-alike characters (`Il1O0|`)
* `alphanumeric`: Upper/lower-case characters and numbers.
* `alphanumeric_friendly`: Like `alphanumeric`, but excluding look-alike characters.
* `numeric`: A string of digits.
* `hex`: Digits and the characters `abcdef` (lowercase).

The third option to the character generator determines whether the password is "exhaustive". If **true** (default **false**), it will ensure that the generated password has at least 1 character of every type in the given alphabet. This is to ensure that generated passwords will fulfill password requirements imposed by some organizations and websites.

## FAQ ##
### Why another password generator?
Because most of the ones on the Internet, that I could easily find, were overly complicated, were generated server-side, or were just plain bad. I made something for myself that is simple but highly functional.

### How's the RNG work?

In the browser: with WebCrypto, specifically with `getRandomValues`. In NodeJS: with `crypto.randomBytes`. These are fed into a function that generates numbers in a range. You can read the source for these in [random/source.ts](src/random/source.ts) and [random/index.ts](src/random/index.ts).

### Doesn't $feature ruin how random my password could be?

There is a feature of the character generator that will optionally ensure that all character classes are met; this is to fulfill password requirements that various sites and organizations impose.

For example, you can generate an alphanumeric password that will always include at least one uppercase character, one lowercase character, and one digit. A truly random password would not guarantee this.

There is another feature that will exclude characters that look similar. This is to make it simpler when reading a password off of your phone to type in on your computer.

Neither of these features significantly reduce the entropy of your password. That said, the web generator clearly states when these features are in effect, and they are completely optional in the library.

### Isn't JavaScript totally insecure for this?

It's popular to say that JavaScript and crypto don't go together, but the real answer is that it depends on the context. This tool is a single file, takes little external input (the URL hash), and makes no remote requests. The overall attack surface is quite small.

### Why is it all on one page?

To load quickly, and so that you can save the single HTML file to your computer if you want. No need to save any extra resources.

### How were the words selected?

The words were sourced from the excellent [12dicts](http://wordlist.aspell.net/12dicts/) package's `3esl` list. These were filtered through a [small script](tools/wordprune.js) to restrict words to 4-8 characters and to remove some [potentially sensitive language](https://www.cs.cmu.edu/~biglou/resources/bad-words.txt).

In the end you have about 11.5k simple words, which is plenty for a passphrase.

### Can I use this in my own programs?

Absolutely! This is published as an npm module if you'd like to use it directly. You may also simply copy the website itself; it's all one HTML file.

Please follow the terms of the [MIT license](LICENSE).

### Can I link to the generator itself for my users?

You could, but I recommend just saving the HTML file and hosting it on your own servers. That way you don't have to worry about the URL changing, and your users don't have to worry about trusting a third-party website.

### What's the license?

[MIT](LICENSE).

### Can I contribute?

Sure! This project is fairly young, so I haven't written up contribution guidelines yet. Feel free to submit an issue and/or contact me if you'd like to work on something.
