const tasks = (...arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'commit-msg': tasks(
      'commitlint -E HUSKY_GIT_PARAMS',
    ),
    'pre-commit': tasks(
      'lerna bootstrap',
      'lerna run format --parallel --stream',
      'lerna run lint --parallel --stream',
      'lerna run build --parallel --stream --ignore=node-assistant-docs',
      'lerna run test --parallel --stream',
    ),
  },
};
