import * as character from '../lib/generators/character';
import * as phrase from '../lib/generators/phrase';

const outputField = document.getElementById('output') as HTMLInputElement;

const typeOptions = document.querySelectorAll('.generator');
for (let i = 0; i < typeOptions.length; i++) {
  const opt = typeOptions.item(i);

  opt.addEventListener('click', typeSelected);
}

const lengthField = document.getElementById('length') as HTMLInputElement;
const lengthSlider = document.getElementById('length-range') as HTMLInputElement;
lengthField.addEventListener('change', e => {
  setLength(parseInt(lengthField.value));
});
lengthSlider.addEventListener('change', e => {
  setLength(parseInt(lengthSlider.value));
});


/**
 * Read in form values, generate a password, and display it.
 */
function generate() {
  // load up the selected type
  const typeRadio = document.querySelector('input[name="type-radio"]:checked') as HTMLInputElement;
  if (typeRadio == null) {
    return;
  }
  const data = typeRadio.dataset as any;

  // read the desired length
  const passLength = parseInt((document.getElementById('length') as HTMLInputElement).value);

  let out;
  const type = data.type;
  if (type === 'character') {
    out = character.generate(passLength, character.alphabets[data.alphabet], data.exhaustive !== 'false');
  } else if (type === 'phrase') {
    out = phrase.generate(passLength, data.specials === 'true');
  }

  const outputField = document.getElementById('output') as HTMLInputElement;
  outputField.value = out;
}

/**
 * When a password type is selected, show more options and generate.
 */
function typeSelected(e: Event) {
  const radio = e.currentTarget as HTMLInputElement;
  const data = radio.dataset as any;

  const lengths = data.length.split(',').map(x => parseInt(x));
  renderLengthOptions(lengths);
  generate();
}

/**
 * Given a list of numbers, update the length picker appropriately.
 */
function renderLengthOptions(lengths: Array<number>) {
  // make quick-select buttons
  const container = document.getElementById('length-presets');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let l of lengths) {
    const btn = document.createElement('button');
    btn.textContent = l.toString();
    btn.addEventListener('click', e => {
      setLength(l);
    });
    container.appendChild(btn);
  }

  // set min/max ranges on slider
  const slider = document.getElementById('length-range') as HTMLInputElement;
  slider.min = lengths[0].toString();
  slider.max = lengths[lengths.length - 1].toString();

  // initialize length to something sane (second length option is "good enough")
  setLength(lengths[1]);
}

/**
 * Change the generated password length via event (hence string length).
 */
function setLength(length: number) {
  // don't we just love the DOM
  const lengthStr = length.toString();
  lengthField.value = lengthStr;
  lengthSlider.value = lengthStr;
  generate();
}
