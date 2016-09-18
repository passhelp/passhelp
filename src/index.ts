import * as characterGenerator from './generators/character';
import * as phraseGenerator from './generators/phrase';

export const Alphabet = characterGenerator.Alphabet;
export const alphabets = characterGenerator.alphabets;
export const character = characterGenerator.generate;
export const phrase = phraseGenerator.generate;
