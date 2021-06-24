const fs       = require('fs-extra');
const minimist = require('minimist')
const path     = require('path');

const isCd    = process.env.APP_CHANNEL === 'usb' || process.env.APP_CHANNEL === 'cd';
const version = process.env.APP_VERSION || 'xxx';

const argv = minimist(process.argv.slice(2));
const dest = path.resolve(`dist/${version}`);

if (isCd) {
  if (argv.win) {
    fs.outputFileSync(path.join(dest, 'win-ia32-unpacked', 'app'), 'foo');
  }
  if (argv.mac) {
    fs.outputFileSync(path.join(dest, 'mac', 'app'), 'foo');
  }
  return;
}

if (argv.mac) {
  fs.outputFileSync(path.join(dest, 'app.dmg'), 'foo');
  fs.outputFileSync(path.join(dest, 'latest-mac.yml'), 'foo');
}

if (argv.win) {
  fs.outputFileSync(path.join(dest, 'app.exe'), 'foo');
  fs.outputFileSync(path.join(dest, 'latest.yml'), 'foo');
}

if (argv.linux) {
  fs.outputFileSync(path.join(dest, 'app-x64.deb'), 'foo');
  fs.outputFileSync(path.join(dest, 'latest-deb-x64.yml'), 'foo');
}
