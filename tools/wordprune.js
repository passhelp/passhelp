const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

// when combined with 3esl from 12dicts, this should yield ~10K words
// excludes hyphenations, multi-word phrases, abbreviations, acronyms, proper nouns
const valid = /^[a-z]{5,8}$/

reader.on('line', line => {
  const trimmed = line.trim()
  if (valid.test(trimmed)) {
    console.log(trimmed)
  }
})
