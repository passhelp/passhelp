// passhelp - MIT License - https://passhelp.github.io
// Copyright 2016 Jacob Peddicord

const fs = require('fs');

const source = fs.readFileSync('wordlist/words.txt', {encoding: 'utf8'});
const words = source.split('\n').map(w => w.trim()).filter(w => w.length > 0);

// separate with a comma instead of a newline:
// when bundled, webpack will write '\n' for newlines (as it should).
// but why waste the space?
process.stdout.write('export default \'')
process.stdout.write(words.join(','));
process.stdout.write('\';\n')
process.stderr.write(`generated ${words.length} words\n`);
