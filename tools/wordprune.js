if (process.argv.length !== 4) {
  console.log('usage: wordprune words.txt exclusions.txt');
  process.exit(1);
}

const fs = require('fs');

const source = fs.readFileSync(process.argv[2], {encoding: 'utf8'});
const excludeSource = fs.readFileSync(process.argv[3], {encoding: 'utf8'});

const exclude = excludeSource.split('\n');

// when combined with 3esl from 12dicts, this should yield ~10K words
// excludes hyphenations, multi-word phrases, abbreviations, acronyms, proper nouns
const valid = /^[a-z]{5,8}$/;

const words = [];
source.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (valid.test(trimmed)) {
    if (!exclude.includes(trimmed)) {
      words.push(trimmed);
    }
  }
});

// separate with a comma instead of a newline:
// when bundled, webpack will write '\n' for newlines (as it should).
// but why waste the space?
process.stdout.write(words.join(','));
process.stderr.write(`generated ${words.length} words\n`);
