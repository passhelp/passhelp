/*!
 * passhelp - MIT License - https://passhelp.github.io
 * Copyright 2016 Jacob Peddicord
 */

import * as character from '../../src/generators/character';
import * as phrase from '../../src/generators/phrase';
import State from './state';

const state = new State(stateChanged);

const outputField = document.getElementById('output') as HTMLInputElement;
const regenerateButton = document.getElementById('regenerate') as HTMLButtonElement;
const typeOptions = document.querySelectorAll('.generator');
const lengthField = document.getElementById('length') as HTMLInputElement;
const lengthPicker = document.getElementById('length-picker') as HTMLElement;
const copiedMessage = document.getElementById('copied-message') as HTMLElement;

state.load(); // calls stateChanged
registerEvents();


/**
 * Link up events for user-initiated actions.
 */
function registerEvents() {
  outputField.addEventListener('focus', () => {
    outputField.select();
    document.execCommand('copy');
    copiedMessage.style.visibility = 'visible';
  });
  outputField.addEventListener('blur', () => {
    copiedMessage.style.visibility = 'hidden';
  })

  regenerateButton.addEventListener('click', generate);

  for (let i = 0; i < typeOptions.length; i++) {
    const opt = typeOptions.item(i);
    opt.addEventListener('click', e => {
      const ele = e.currentTarget as HTMLInputElement;
      const lengths = showType(ele);
      state.passtype = ele.id;
      state.length = lengths[1];
      state.persist();
    });
  }

  lengthField.addEventListener('input', e => {
    state.length = parseInt(lengthField.value);
    state.persist();
  });
  lengthField.addEventListener('focus', e => {
    lengthField.select();
  });
}

/**
 * Generate a new password whenever the state changes & update UI.
 */
function stateChanged() {
  if (!state.passtype || !state.length) {
    return;
  }

  const radio = document.getElementById(state.passtype) as HTMLInputElement;
  radio.checked = true;
  showType(radio);
  lengthField.value = state.length.toString();
  generate();
}

/**
 * Generate a password from the current state.
 */
function generate() {
  if (state.passtype == null || state.length == null) {
    return;
  }

  // load up the selected type
  const typeRadio = document.getElementById(state.passtype) as HTMLInputElement;
  if (typeRadio == null) {
    return;
  }
  const data = typeRadio.dataset as any;

  // generate something
  let out = '';
  const type = data.type;
  if (type === 'character') {
    out = character.generate(state.length, (<any>character.alphabets)[data.alphabet], data.exhaustive === 'true');
  } else if (type === 'phrase') {
    out = phrase.generate(state.length, data.specials === 'true');
  }

  // show generated password
  const outputArea = document.getElementById('output-area') as HTMLElement;
  outputArea.style.visibility = 'visible';
  outputField.value = out;
}

/**
 * Show details of a selected password type.
 *
 * Does not change state.
 */
function showType(radio: HTMLInputElement): number[] {
  const data = radio.dataset as any;
  const passtype = radio.id

  // show description
  const descs = document.querySelectorAll('#description > .type');
  for (let i = 0; i < descs.length; i++) {
    const txt = descs.item(i) as HTMLElement;
    txt.style.display = 'none';
  }
  const desc = document.getElementById(`desc_${passtype}`) as HTMLElement;
  desc.style.display = 'block';

  // make some length presets & show the picker
  const lengths = data.length.split(',').map((x: string) => parseInt(x));
  renderLengthOptions(lengths);
  lengthPicker.style.visibility = 'visible';

  return lengths;
}

/**
 * Given a list of numbers, update the length picker appropriately.
 */
function renderLengthOptions(lengths: Array<number>) {
  // make quick-select buttons
  const container = document.getElementById('length-presets') as HTMLElement;
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let l of lengths) {
    const btn = document.createElement('button');
    btn.textContent = l.toString();
    btn.addEventListener('click', e => {
      state.length = l;
      state.persist();
    });
    container.appendChild(btn);
  }
}
