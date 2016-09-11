import * as character from '../lib/generators/character';
import * as phrase from '../lib/generators/phrase';


const out = document.getElementById('output') as HTMLInputElement;

const buttons = document.querySelectorAll('.generator');
for (let i = 0; i < buttons.length; i++) {
  const button = buttons.item(i);

  button.addEventListener('click', buttonGenerate);
}

function buttonGenerate(e: Event) {
  const button = e.currentTarget as HTMLButtonElement;

  // TODO: this is obviously not right for all buttons
  out.value = phrase.generate(4, false);
}
