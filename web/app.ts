import * as character from '../lib/generators/character';
import * as phrase from '../lib/generators/phrase';


const outputField = document.getElementById('output') as HTMLInputElement;

const buttons = document.querySelectorAll('.generator');
for (let i = 0; i < buttons.length; i++) {
  const button = buttons.item(i);

  button.addEventListener('click', buttonGenerate);
}

function buttonGenerate(e: Event) {
  const button = e.currentTarget as HTMLButtonElement;
  const data = button.dataset as any;

  let out;
  const type = data.type;
  const [length, lengths] = parseLengths(data.length);
  if (type === 'character') {
    out = character.generate(length, character.alphabets[data.alphabet]);
  } else if (type === 'phrase') {
    out = phrase.generate(length, data.specials === 'true');
  }

  outputField.value = out;
  renderLengthButtons(lengths);
}

function parseLengths(lengthStr: string): [number, Array<number>] {
  const items = lengthStr.split(',').map(l => parseInt(l));
  return [items[items.length - 1], items];
}

function renderLengthButtons(lengths: Array<number>) {

}
