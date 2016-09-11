const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// when combined with 3esl from 12dicts, this should yield ~10K words
// excludes hyphenations, multi-word phrases, abbreviations, acronyms, proper nouns
const valid = /^[a-z]{5,8}$/;

const words = [];

reader.on('line', line => {
  const trimmed = line.trim();
  if (valid.test(trimmed)) {
    words.push(trimmed);
  }
});

// separate with a comma instead of a newline:
// when bundled, webpack will write '\n' for newlines (as it should).
// but why waste the space?
reader.on('close', () => {
  process.stdout.write(words.join(','));
});

