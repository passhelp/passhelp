// passhelp - MIT License - https://passhelp.github.io
// Copyright 2016 Jacob Peddicord

export default class State {
  private _passtype: string | null;
  private _length: number | null;
  private _trigger: () => any;

  constructor(trigger: () => any) {
    this._passtype = null;
    this._length = null;
    this._trigger = trigger;
  }

  load() {
    const urlHash = document.location.hash;
    if (!urlHash || !/^#\w{1,20}:\d{1,2}$/.test(urlHash)) {
      return;
    }

    const [passtype, length] = urlHash.substring(1).split(':');

    this._passtype = passtype;
    this._length = parseInt(length);
    this._trigger();
  }

  persist() {
    const target = `#${this._passtype}:${this._length}`;
    history.replaceState({}, '', target);
  }

  get passtype(): string | null { return this._passtype; }
  set passtype(val: string | null) {
    this._passtype = val;
    this._trigger();
  }

  get length(): number | null { return this._length; }
  set length(val: number | null) {
    this._length = val;
    this._trigger();
  }

}
