import { character, alphabets } from 'passhelp';

const pass = character(16, alphabets.full_friendly, true);

console.log('Here\'s your password:');
console.log(pass);
