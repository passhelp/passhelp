const fs = require('fs');
const Handlebars = require('handlebars');

const template = fs.readFileSync(__dirname + '/../web/_template.html', {encoding: 'utf8'});
const css = fs.readFileSync(__dirname + '/../web/style.css', {encoding: 'utf8'});
const script = fs.readFileSync(__dirname + '/../build/app.bundle.js', {encoding: 'utf8'});

const t = Handlebars.compile(template);
const out = t({
  css,
  script
});

fs.writeFileSync(__dirname + '/../build/passhelp.html', out);
