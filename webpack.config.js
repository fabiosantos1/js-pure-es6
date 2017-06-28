const target = process.env.npm_lifecycle_event;
let env = 'prod';

switch (target) {
    case 'dev':
    case 'build':
    env = 'dev';
}

module.exports = function() {
  return require(`./webpack.${env}.js`)
}

